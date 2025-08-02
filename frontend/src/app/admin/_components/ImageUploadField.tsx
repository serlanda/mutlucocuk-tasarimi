"use client";

import { useState } from "react";
import { UploadButton } from "~/utils/uploadthing";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import FormInput from "./FormInput";

interface ImageUploadFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  name: string;
  placeholder?: string;
}

export default function ImageUploadField({ 
  value, 
  onChange, 
  error, 
  name, 
  placeholder = "Görsel URL'sini girin veya dosya yükleyin" 
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleRemoveImage = () => {
    onChange("");
  };

  return (
    <div className="space-y-4">
      {/* URL Input */}
      <FormInput
        type="url"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        error={error}
      />

      {/* Upload Button */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <UploadButton
            endpoint="imageUploader"
            onUploadBegin={() => setIsUploading(true)}
            onClientUploadComplete={(res) => {
              setIsUploading(false);
              if (res && res[0]) {
                onChange(res[0].url);
              }
            }}
            onUploadError={() => {
              setIsUploading(false);
            }}
            appearance={{
              button: `bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`,
              allowedContent: "text-gray-600 text-sm",
              container: "flex flex-col items-start gap-2"
            }}
          />
        </div>
        
        {isUploading && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Yükleniyor...
          </div>
        )}
      </div>

      {/* Image Preview */}
      {value && (
        <div className="relative inline-block">
          <img 
            src={value} 
            alt="Ürün önizleme" 
            className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-sm transition-colors"
            title="Görseli kaldır"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Placeholder when no image */}
      {!value && (
        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <PhotoIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-500">Görsel önizleme</p>
          </div>
        </div>
      )}
    </div>
  );
}