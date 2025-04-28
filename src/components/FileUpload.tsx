
import React, { useState, useRef } from 'react';
import { GeminiChatHistory } from '../types/gemini';
import { Button } from './ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileLoaded: (data: GeminiChatHistory) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type !== 'application/json') {
      toast.error('Please upload a JSON file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        if (!Array.isArray(jsonData)) {
          toast.error('Invalid format: JSON should be an array');
          return;
        }
        onFileLoaded(jsonData);
        toast.success('Chat history loaded successfully');
      } catch (error) {
        toast.error('Error parsing JSON file');
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`w-full p-8 flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors ${
        isDragging ? 'border-gemini bg-gemini/5' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="w-12 h-12 text-gemini mb-4" />
      <h3 className="text-lg font-medium mb-2">Upload Your Gemini Chat History</h3>
      <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
        Drag and drop your Gemini JSON file here, or click to select a file
      </p>
      <Button 
        onClick={openFileDialog} 
        className="bg-gemini hover:bg-gemini-secondary text-white"
      >
        Select JSON File
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept=".json"
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
