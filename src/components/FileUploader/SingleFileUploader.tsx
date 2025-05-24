/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import { Input } from '../ui/input';
import { CloudUpload, X } from 'lucide-react';
import { useRemoveFileMutation, useUploadFileMutation } from '@/redux/endpoints/fileUploadApi';
import upload from '../../assets/upload.svg';

export type CloudinaryUploadResponse = {
    url: string;
    secure_url: string;
    public_id: string;
    resource_type: string;
    original_filename: string;
    [key: string]: any;
};

export type SingleFileUploaderProps = {
    folder?: string;
    allowedFormats?: string[];
    fileData?: CloudinaryUploadResponse | null;
    onUploadSuccess: (data: CloudinaryUploadResponse) => void;
    onDeleteSuccess?: (publicId: string) => void;
    disabled?: boolean;
    className?: string;
    maxSize?: number;
};

export default function SingleFileUploader({
    folder,
    allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'],
    fileData = null,
    onUploadSuccess,
    onDeleteSuccess,
    disabled = false,
    className = '',
    maxSize = 5 * 1024 * 1024, // Default 5MB
}: SingleFileUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [uploadFile] = useUploadFileMutation();
    const [removeFile] = useRemoveFileMutation();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        setError(null);

        // Validate file type
        if (!allowedFormats.includes(file.type) && !allowedFormats.includes('*/*')) {
            setError(`Invalid file type. Allowed formats: ${allowedFormats.join(', ')}`);
            return;
        }

        // Validate file size
        if (file.size > maxSize) {
            setError(`File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        if (folder) formData.append('folder', folder);

        try {
            const res = await uploadFile(formData).unwrap();
            onUploadSuccess(res.data);
        } catch (err) {
            console.error(err);
            setError('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemove = async (publicId: string) => {
        try {
            await removeFile({ publicId }).unwrap();
            onDeleteSuccess?.(publicId);
        } catch (err) {
            console.error('Failed to delete from server', err);
        }
    };

    const triggerFileInput = () => {
        if (!disabled && !isUploading) {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <div className="flex gap-4 items-start flex-wrap">
                {fileData ? (
                    <div className="relative group w-[130px] h-[130px]">
                        <img
                            src={fileData.secure_url}
                            alt={fileData.original_filename || 'Uploaded file'}
                            className="w-full h-full object-cover rounded-md"
                        />
                        {!disabled && (
                            <button
                                type="button"
                                onClick={() => handleRemove(fileData.public_id)}
                                className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Remove file"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="w-full relative">
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            className={`w-full py-10 px-4 rounded-md border-2 border-dashed ${
                                isUploading
                                    ? 'border-primary/50'
                                    : 'border-gray-300 hover:border-primary'
                            } flex flex-col items-center justify-center transition-colors`}
                            disabled={disabled || isUploading}
                        >
                            {isUploading ? (
                                <>
                                    <img
                                        src={upload}
                                        alt="Uploading"
                                        className="w-12 h-12 mb-2 animate-pulse"
                                    />
                                    <span className="text-sm text-gray-500 text-center">
                                        Uploading...
                                    </span>
                                </>
                            ) : (
                                <>
                                    <CloudUpload className="text-[#6B6B6B] mb-2" size={24} />
                                    <span className="text-sm text-gray-500 text-center">
                                        Upload file or{' '}
                                        <span className="text-primary font-medium">Browse</span>
                                    </span>
                                    <span className="text-xs text-muted-foreground mt-1">
                                        Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
                                    </span>
                                </>
                            )}
                        </button>
                        <Input
                            type="file"
                            accept={allowedFormats.join(',')}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={disabled || isUploading}
                        />
                    </div>
                )}
            </div>

            {error && <p className="text-sm font-medium text-destructive mt-1">{error}</p>}
        </div>
    );
}
