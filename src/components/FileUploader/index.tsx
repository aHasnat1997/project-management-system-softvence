/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { CloudUpload, X } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useRemoveFileMutation, useUploadFileMutation } from "@/redux/endpoints/fileUploadApi";

export type CloudinaryUploadResponse = {
  url: string;
  secure_url: string;
  public_id: string;
  resource_type: string;
  original_filename: string;
  [key: string]: any;
};

export type FileUploaderProps = {
  folder?: string;
  allowedFormats?: string[];
  fileData: CloudinaryUploadResponse[];
  onUploadSuccess: (data: CloudinaryUploadResponse[]) => void;
  onDeleteSuccess?: (publicId: string) => void;
};

export default function FileUploader({
  folder,
  allowedFormats = ["*/*"],
  fileData,
  onUploadSuccess,
  onDeleteSuccess,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingIds, setUploadingIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [uploadFile] = useUploadFileMutation();
  const [removeFile] = useRemoveFileMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedFiles: CloudinaryUploadResponse[] = [];

    setError(null);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      if (folder) formData.append("folder", folder);

      const fakeId = `${file.name}-${file.size}`;
      setUploadingIds(prev => [...prev, fakeId]);

      try {
        const res = await uploadFile(formData).unwrap();
        uploadedFiles.push(res.data);
      } catch (err) {
        console.error(err);
        setError("Upload failed. Please try again.");
      } finally {
        setUploadingIds(prev => prev.filter(id => id !== fakeId));
      }
    }

    if (uploadedFiles.length > 0) {
      onUploadSuccess([...fileData, ...uploadedFiles]);
    }
  };

  const handleRemove = async (publicId: string) => {
    try {
      await removeFile({ publicId }).unwrap();
      onDeleteSuccess?.(publicId);
    } catch (err) {
      console.error("Failed to delete from server", err);
    }
  };

  return (
    <div className="flex gap-4 items-start flex-wrap">
      {/* Upload Button */}
      <div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="py-10 px-20 rounded-md border-2 border-dotted border-primary bg-primary/20 flex flex-col items-center justify-center"
        >
          <CloudUpload />
          Upload Files
        </button>
        <Input
          type="file"
          multiple
          accept={allowedFormats.join(",")}
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* Previews */}
      <div className="flex flex-wrap gap-4">
        {fileData.map((file) => (
          <div
            key={file.public_id}
            className="relative group w-[130px] h-[130px] overflow-hidden rounded-md border"
          >
            <img
              src={file.secure_url}
              alt={file.original_filename}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(file.public_id)}
              className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {/* Skeletons for uploading files */}
        {uploadingIds.map((id) => (
          <Skeleton
            key={id}
            className="w-[130px] h-[130px] rounded-md bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
