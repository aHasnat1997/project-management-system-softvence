import DialogWrapper from "@/components/DialogContents"
import FileUploader, { type CloudinaryUploadResponse } from "@/components/FileUploader"
import Headers from "@/components/Headers"
import SearchInput from "@/components/SearchInput"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"

export default function Member() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [files, setFiles] = useState<CloudinaryUploadResponse[]>([]);

  const handleUploadSuccess = (uploaded: CloudinaryUploadResponse[]) => {
    setFiles(uploaded);
  };

  const handleDeleteSuccess = (publicId: string) => {
    setFiles((prev) => prev.filter((file) => file.public_id !== publicId));
  };


  return (
    <>
      <Headers title="Member">
        <div className="flex items-center gap-2">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
          <DialogWrapper
            trigger={
              <Button>
                <Plus /> Add Member
              </Button>
            }
            content={<h1>Add Member</h1>}
          />
        </div>
      </Headers>

      <div>
        <FileUploader
          folder="my_uploads"
          allowedFormats={["image/*", "application/pdf"]}
          fileData={files}
          onUploadSuccess={handleUploadSuccess}
          onDeleteSuccess={handleDeleteSuccess}
        />
      </div>
    </>
  )
};
