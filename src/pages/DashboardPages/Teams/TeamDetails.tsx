import { useSingleTeamQuery } from '@/redux/endpoints/teamsApi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TeamDetailsSkeleton } from './TeamDetailsSkeleton';

interface User {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    avatar: string;
    designation: string;
    role: string;
    userStatus: string;
}

interface TeamMember {
    _id: string;
    userId: User;
    teamId: string;
    memberType: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default function TeamDetails({ slug }: { slug: string }) {
    const { data: team, isLoading } = useSingleTeamQuery(slug);

    if (isLoading) {
        return <TeamDetailsSkeleton />;
    }

    if (!team?.data) {
        return <div>Team not found</div>;
    }

    const teamData = team.data;

    return (
        <div className="space-y-6">
            {/* Team Header */}
            <div className="relative w-32 h-32">
                <Avatar className="h-32 w-32">
                    <AvatarImage src={teamData.teamlogo} alt={teamData.teamName} />
                    <AvatarFallback className="text-3xl">
                        {teamData.teamName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div
                    className={`absolute bottom-2 right-4 w-5 h-5 ${
                        teamData.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                    } border-2 border-white rounded-full`}
                ></div>
            </div>
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
                <div className="space-y-2 text-center md:text-left">
                    <div className="flex items-center justify-center gap-2 md:justify-start">
                        <h1 className="text-3xl font-bold">{teamData.teamName}</h1>
                        {/* <Badge variant={teamData.status === 'Active' ? 'default' : 'destructive'}>
                            {teamData.status}
                        </Badge> */}
                    </div>
                    <p className="text-muted-foreground">{teamData.teamDescription}</p>
                </div>
            </div>

            {/* Team Lead */}
            <h2 className="text-lg font-semibold"> Leader</h2>
            <Card>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 ">
                            <AvatarImage src={teamData.teamLead.avatar} />
                            <AvatarFallback>
                                {teamData.teamLead.firstName?.charAt(0)}
                                {teamData.teamLead.lastName?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-foreground">
                                {teamData.teamLead.firstName} {teamData.teamLead.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {teamData.teamLead.designation} • {teamData.teamLead.role}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Team Members */}
            <div>
                <div className="flex justify-between items-center my-2">
                    <h2 className="text-lg font-semibold">Team Members</h2>
                    <Badge variant="outline">
                        {teamData.members.length} member
                        {teamData.members.length !== 1 ? 's' : ''}
                    </Badge>
                </div>
                <div className="grid gap-1 md:grid-cols-2 ">
                    {teamData.members.map((member: TeamMember) => (
                        <Card key={member._id}>
                            <CardContent className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={member.userId.avatar} />
                                    <AvatarFallback>
                                        {member.userId.firstName?.charAt(0)}
                                        {member.userId.lastName?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">
                                        {member.userId.firstName} {member.userId.lastName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {member.userId.designation} • {member.status}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {member.memberType}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
