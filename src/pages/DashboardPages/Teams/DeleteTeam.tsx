import ConfirmDelete from '@/components/DialogContents/ConfirmDelete';
import { useTeamDeleteMutation } from '@/redux/endpoints/teamsApi';
import { toast } from 'sonner';

export default function DeleteTeam({ slug }: { slug: string }) {
    const [teamDelete, { isLoading }] = useTeamDeleteMutation();

    const onConfirm = async () => {
        try {
            if (!slug) {
                toast.error('Team identifier is missing');
                return;
            }

            await teamDelete(slug).unwrap();
            toast.success('Team deleted successfully');
        } catch (error) {
            console.error('Failed to delete team:', error);
            toast.error('Failed to delete team');
        }
    };

    return <ConfirmDelete isLoading={isLoading} onConfirm={onConfirm} />;
}
