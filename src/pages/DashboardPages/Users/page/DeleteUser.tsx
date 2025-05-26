import ConfirmDelete from "@/components/DialogContents/ConfirmDelete";
import { useUserDeleteMutation } from "@/redux/endpoints/userApi";
import { toast } from "sonner";

export default function DeleteUser({ userId }: { userId: string }) {
  const [userDelete, { isLoading }] = useUserDeleteMutation();

  const onConfirm = async () => {
    try {
      await userDelete(userId).unwrap();
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
