/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import { Input } from '../ui/input';
import { CloudUpload, X } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useRemoveFileMutation, useUploadFileMutation } from '@/redux/endpoints/fileUploadApi';

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
};

export default function SingleFileUploader({
    folder,
    allowedFormats = ['*/*'],
    fileData = null,
    onUploadSuccess,
    onDeleteSuccess,
}: SingleFileUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [uploadFile] = useUploadFileMutation();
    const [removeFile] = useRemoveFileMutation();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setError(null);
        setIsUploading(true);

        const file = files[0];
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
            // Reset the input value to allow selecting the same file again if needed
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

    return (
        <div className="flex gap-4 items-start flex-wrap">
            {/* Upload Button - Only show if no file is uploaded */}
            {!fileData && (
                <div>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="py-10 px-20 rounded-md border-2 border-dotted border-primary flex flex-col items-center justify-center"
                        disabled={isUploading}
                    >
                        <CloudUpload className="text-[#6B6B6B]" />
                        Upload file or <span className="text-primary">Browse</span>
                    </button>
                    <Input
                        type="file"
                        accept={allowedFormats.join(',')}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isUploading}
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            )}

            {/* Preview or Uploading Skeleton */}
            <div className="flex flex-wrap gap-4">
                {fileData && (
                    <div className="relative group w-[130px] h-[130px] overflow-hidden rounded-md border">
                        <img
                            src={fileData.secure_url}
                            alt={fileData.original_filename}
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(fileData.public_id)}
                            className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* Skeleton for uploading state */}
                {isUploading && (
                    <Skeleton className="w-[130px] h-[130px] rounded-md bg-gray-200 animate-pulse" />
                )}
            </div>
        </div>
    );
}
