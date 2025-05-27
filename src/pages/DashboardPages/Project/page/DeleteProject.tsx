import ConfirmDelete from "@/components/DialogContents/ConfirmDelete";
import { useProjectDeleteMutation } from "@/redux/endpoints/projectsApi";
import { toast } from "sonner";

export default function DeleteProject({ projectId }: { projectId: string }) {
  const [projectDelete, { isLoading }] = useProjectDeleteMutation();

  const onConfirm = async () => {
    try {
      await projectDelete(projectId).unwrap();
      toast.success("User deleted successfully");
      // Optionally, you can show a success message or redirect the user
    } catch (error) {
      console.error("Failed to delete user:", error);
      // Optionally, you can show an error message
    }
  };

  return (
    <>
      <ConfirmDelete isLoading={isLoading} onConfirm={onConfirm} />
    </>
  );
};
