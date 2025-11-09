import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { resumeParserService, ParsedResumeData } from '../services/resumeParser';

interface ResumeImporterProps {
  onImportComplete: (data: ParsedResumeData) => void;
  onClose: () => void;
}

export default function ResumeImporter({ onImportComplete, onClose }: ResumeImporterProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    console.log('onDrop called with files:', acceptedFiles.length);
    console.log('Accepted files:', acceptedFiles.map(f => ({ name: f.name, type: f.type, size: f.size })));
    
    const file = acceptedFiles[0];
    if (!file) {
      console.log('No file found in acceptedFiles');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    setParsedData(null);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Parse the resume file
      const data = await resumeParserService.parseResumeFile(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setParsedData(data);

      toast({
        title: "Resume Parsed Successfully",
        description: "Your resume has been processed. Review the extracted information below.",
      });
    } catch (error) {
      console.error('Import error:', error);
      setError(error.message);
      toast({
        title: "Import Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    onDropRejected: (rejectedFiles) => {
      console.log('Files rejected:', rejectedFiles);
      rejectedFiles.forEach(({ file, errors }) => {
        console.log(`Rejected file: ${file.name}, type: ${file.type}, size: ${file.size}`);
        errors.forEach(error => {
          console.log(`Error: ${error.code} - ${error.message}`);
        });
      });
    },
    validator: (file) => {
      // Custom validator to allow files by extension if MIME type fails
      const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt'];
      const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      
      console.log(`Validating file: ${file.name}, type: ${file.type}, extension: ${fileExtension}`);
      
      if (!allowedExtensions.includes(fileExtension)) {
        return {
          code: 'file-invalid-type',
          message: `File type not supported. Please use: ${allowedExtensions.join(', ')}`
        };
      }
      
      return null; // File is valid
    },
    accept: {
      'application/pdf': ['.pdf'],
      'application/x-pdf': ['.pdf'],
      'application/acrobat': ['.pdf'],
      'application/vnd.pdf': ['.pdf'],
      'text/pdf': ['.pdf'],
      'text/x-pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
    disabled: isUploading
  });

  const handleApplyImport = () => {
    if (parsedData) {
      onImportComplete(parsedData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Import Resume</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {!parsedData && !error && (
          <div className="space-y-6">
            {/* File Upload Area */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                ${isUploading ? 'pointer-events-none opacity-50' : ''}
              `}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              {isDragActive ? (
                <p className="text-lg text-blue-600">Drop your resume here...</p>
              ) : (
                <>
                  <p className="text-lg mb-2">
                    Drag & drop your resume here, or <span className="text-blue-600 underline">click to browse</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF, DOCX, DOC, and TXT files (max 50MB)
                  </p>
                </>
              )}
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing resume...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* File Rejection Errors */}
            {fileRejections.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                  <h3 className="text-sm font-medium text-red-800">Upload Error</h3>
                </div>
                <div className="mt-2 text-sm text-red-700">
                  {fileRejections.map(({ file, errors }) => (
                    <div key={file.name}>
                      <strong>{file.name}</strong>:
                      <ul className="list-disc list-inside ml-4">
                        {errors.map(error => (
                          <li key={error.code}>{error.message}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Supported Formats Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Supported Formats</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  PDF (.pdf)
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Word (.docx, .doc)
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Text (.txt)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <h3 className="text-sm font-medium text-red-800">Import Failed</h3>
              </div>
              <div className="mt-2 text-sm text-red-700">
                {error}
              </div>
            </div>
            <Button onClick={() => { setError(null); }} className="w-full">
              Try Again
            </Button>
          </div>
        )}

        {/* Parsed Data Preview */}
        {parsedData && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <h3 className="text-sm font-medium text-green-800">Resume Parsed Successfully</h3>
              </div>
              <p className="mt-1 text-sm text-green-700">
                Review the extracted information below and click "Apply Import" to populate your resume form.
              </p>
            </div>

            {/* Data Preview */}
            <div className="space-y-4 max-h-96 overflow-auto">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><strong>Name:</strong> {parsedData.personalInfo.fullName || 'Not found'}</div>
                  <div><strong>Email:</strong> {parsedData.personalInfo.email || 'Not found'}</div>
                  <div><strong>Phone:</strong> {parsedData.personalInfo.phone || 'Not found'}</div>
                  <div><strong>Location:</strong> {parsedData.personalInfo.location || 'Not found'}</div>
                </div>
                {parsedData.personalInfo.summary && (
                  <div className="mt-2">
                    <strong>Summary:</strong>
                    <p className="text-sm mt-1">{parsedData.personalInfo.summary}</p>
                  </div>
                )}
              </div>

              {/* Experience */}
              {parsedData.experience.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Experience ({parsedData.experience.length} entries)</h4>
                  {parsedData.experience.slice(0, 2).map((exp, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                      <div className="text-sm">
                        <strong>{exp.title}</strong> at <strong>{exp.company}</strong>
                        {exp.duration && <span className="text-gray-600"> ({exp.duration})</span>}
                      </div>
                      {exp.description && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                  {parsedData.experience.length > 2 && (
                    <p className="text-xs text-gray-500">...and {parsedData.experience.length - 2} more entries</p>
                  )}
                </div>
              )}

              {/* Education */}
              {parsedData.education.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Education ({parsedData.education.length} entries)</h4>
                  {parsedData.education.map((edu, index) => (
                    <div key={index} className="text-sm mb-2 last:mb-0">
                      <strong>{edu.degree}</strong> - {edu.school}
                      {edu.year && <span className="text-gray-600"> ({edu.year})</span>}
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {parsedData.skills.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Skills ({parsedData.skills.length} found)</h4>
                  <div className="flex flex-wrap gap-1">
                    {parsedData.skills.slice(0, 10).map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {parsedData.skills.length > 10 && (
                      <span className="text-xs text-gray-500">+{parsedData.skills.length - 10} more</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4 border-t">
              <Button onClick={handleApplyImport} className="flex-1">
                Apply Import
              </Button>
              <Button variant="outline" onClick={() => { setParsedData(null); }} className="flex-1">
                Upload Different File
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}