import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import mammoth from "mammoth";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Download logging endpoint
  app.post('/api/log-download', async (req, res) => {
    try {
      const { email } = req.body;
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
      const timestamp = new Date().toISOString();
      
      // Create log entry
      const logEntry = `${timestamp} | Email: ${email} | IP: ${ip}\n`;
      
      // Path to downloads log file (in server directory, not accessible via web)
      const logFilePath = path.join(__dirname, 'downloads.txt');
      
      // Append to file (creates file if it doesn't exist)
      await fs.appendFile(logFilePath, logEntry, 'utf-8');
      
      res.json({ success: true, message: 'Download logged successfully' });
    } catch (error) {
      console.error('Error logging download:', error);
      res.status(500).json({ error: 'Failed to log download' });
    }
  });

  // PDF/Document parsing endpoint
  app.post('/api/parse-resume', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const file = req.file;
      let text = '';

      console.log(`Parsing file: ${file.originalname}, type: ${file.mimetype}, size: ${file.size}`);

      // Extract text based on file type
      switch (file.mimetype) {
        case 'application/pdf':
          try {
            // Use createRequire for CommonJS modules in ESM context
            const { createRequire } = await import('module');
            const require = createRequire(import.meta.url);
            const pdfParse = require('pdf-parse');
            
            console.log('Parsing PDF with buffer size:', file.buffer.length);
            const pdfData = await pdfParse(file.buffer);
            text = pdfData.text;
            console.log('Successfully extracted text, length:', text.length);
          } catch (pdfError) {
            console.error('PDF parsing specific error:', pdfError);
            throw new Error(`Failed to parse PDF: ${pdfError.message}`);
          }
          break;
          
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/msword':
          const docResult = await mammoth.extractRawText({ buffer: file.buffer });
          text = docResult.value;
          break;
          
        case 'text/plain':
          text = file.buffer.toString('utf-8');
          break;
          
        default:
          return res.status(400).json({ error: `Unsupported file type: ${file.mimetype}` });
      }

      console.log(`Extracted text length: ${text.length}`);
      console.log(`First 200 chars: "${text.substring(0, 200)}"`);
      
      if (!text.trim()) {
        return res.status(400).json({ error: 'No text content found in the file' });
      }
      
      // If very little text was extracted, still return it but with a warning
      if (text.trim().length < 50) {
        console.warn('Very little text extracted from PDF');
      }

      res.json({ text });
    } catch (error) {
      console.error('Server-side parsing error:', error);
      res.status(500).json({ 
        error: 'Failed to parse document. Please ensure the file is not corrupted or password-protected.' 
      });
    }
  });

  return httpServer;
}
