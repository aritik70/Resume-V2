import React, { useRef, useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  "data-testid"?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter text...",
  className,
  "data-testid": testId,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);


  const formatText = useCallback((command: string) => {
    if (editorRef.current) {
      // Ensure the editor is focused before executing command
      editorRef.current.focus();
      
      // Use execCommand for formatting - it handles selection automatically
      if (command === 'bold') {
        document.execCommand('bold', false);
      } else if (command === 'italic') {
        document.execCommand('italic', false);
      } else if (command === 'underline') {
        document.execCommand('underline', false);
      } else if (command === 'insertUnorderedList') {
        document.execCommand('insertUnorderedList', false);
      } else if (command === 'insertOrderedList') {
        document.execCommand('insertOrderedList', false);
      } else if (command.startsWith('justify')) {
        document.execCommand(command, false);
      }
      
      // Get the updated content and sanitize
      const sanitizedHTML = DOMPurify.sanitize(editorRef.current.innerHTML, {
        ALLOWED_TAGS: ['b', 'i', 'u', 'strong', 'em', 'span', 'div', 'p', 'ul', 'ol', 'li', 'br'],
        ALLOWED_ATTR: ['style', 'class'],
        KEEP_CONTENT: true
      });
      
      // Update value
      onChange(sanitizedHTML);
    }
  }, [onChange]);

  const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    if (editorRef.current) {
      const sanitizedHTML = DOMPurify.sanitize(editorRef.current.innerHTML, {
        ALLOWED_TAGS: ['b', 'i', 'u', 'strong', 'em', 'span', 'div', 'p', 'ul', 'ol', 'li', 'br'],
        ALLOWED_ATTR: ['style', 'class'],
        KEEP_CONTENT: true
      });
      onChange(sanitizedHTML);
    }
  }, [onChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (editorRef.current) {
      // Get clipboard data
      const clipboardData = e.clipboardData;
      let pasteContent = '';
      
      // Try to get HTML first, then fallback to plain text
      if (clipboardData.types.includes('text/html')) {
        pasteContent = clipboardData.getData('text/html');
      } else {
        pasteContent = clipboardData.getData('text/plain');
      }
      
      // Sanitize the pasted content
      const sanitizedHTML = DOMPurify.sanitize(pasteContent, {
        ALLOWED_TAGS: ['b', 'i', 'u', 'strong', 'em', 'span', 'div', 'p', 'ul', 'ol', 'li', 'br'],
        ALLOWED_ATTR: ['style', 'class'],
        KEEP_CONTENT: true
      });
      
      // Insert sanitized content at cursor
      if (sanitizedHTML) {
        document.execCommand('insertHTML', false, sanitizedHTML);
        
        // Update the value with the new content
        const updatedHTML = DOMPurify.sanitize(editorRef.current.innerHTML, {
          ALLOWED_TAGS: ['b', 'i', 'u', 'strong', 'em', 'span', 'div', 'p', 'ul', 'ol', 'li', 'br'],
          ALLOWED_ATTR: ['style', 'class'],
          KEEP_CONTENT: true
        });
        onChange(updatedHTML);
      }
    }
  }, [onChange]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // Convert HTML to plain text for display purposes
  const getPlainText = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const showPlaceholder = !value || getPlainText(value).trim() === '';

  // Effect to update content only when value changes from outside
  useEffect(() => {
    if (editorRef.current && !isFocused) {
      const sanitizedValue = DOMPurify.sanitize(value, {
        ALLOWED_TAGS: ['b', 'i', 'u', 'strong', 'em', 'span', 'div', 'p', 'ul', 'ol', 'li', 'br'],
        ALLOWED_ATTR: ['style', 'class'],
        KEEP_CONTENT: true
      });
      
      if (editorRef.current.innerHTML !== sanitizedValue) {
        editorRef.current.innerHTML = sanitizedValue;
      }
    }
  }, [value, isFocused]);

  return (
    <div className="space-y-2">
      {/* Formatting Toolbar */}
      <div className="flex items-center gap-1 p-1 border rounded-md bg-muted/50 flex-wrap">
        {/* Text Style */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('bold')}
            className="h-7 w-7 p-0"
            title="Bold"
            data-testid="button-rte-bold"
          >
            <Bold className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('italic')}
            className="h-7 w-7 p-0"
            title="Italic"
            data-testid="button-rte-italic"
          >
            <Italic className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('underline')}
            className="h-7 w-7 p-0"
            title="Underline"
            data-testid="button-rte-underline"
          >
            <Underline className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Separator */}
        <div className="w-px h-4 bg-border" />
        
        {/* Text Alignment */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('justifyLeft')}
            className="h-7 w-7 p-0"
            title="Align Left"
            data-testid="button-rte-align-left"
          >
            <AlignLeft className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('justifyCenter')}
            className="h-7 w-7 p-0"
            title="Align Center"
            data-testid="button-rte-align-center"
          >
            <AlignCenter className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('justifyRight')}
            className="h-7 w-7 p-0"
            title="Align Right"
            data-testid="button-rte-align-right"
          >
            <AlignRight className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('justifyFull')}
            className="h-7 w-7 p-0"
            title="Justify"
            data-testid="button-rte-align-justify"
          >
            <AlignJustify className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Separator */}
        <div className="w-px h-4 bg-border" />
        
        {/* Lists */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('insertUnorderedList')}
            className="h-7 w-7 p-0"
            title="Bullet List"
            data-testid="button-rte-list-bullet"
          >
            <List className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('insertOrderedList')}
            className="h-7 w-7 p-0"
            title="Numbered List"
            data-testid="button-rte-list-numbered"
          >
            <ListOrdered className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Rich Text Editor */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onPaste={handlePaste}
          onFocus={handleFocus}
          onBlur={handleBlur}
          dir="auto"
          className={cn(
            "min-h-[80px] max-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background overflow-y-auto",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            isFocused && "ring-2 ring-ring ring-offset-2",
            className
          )}
          data-testid={testId}
          suppressContentEditableWarning={true}
        />
        
        {/* Placeholder overlay */}
        {showPlaceholder && (
          <div 
            className="absolute top-2 left-3 pointer-events-none text-muted-foreground text-sm"
          >
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}