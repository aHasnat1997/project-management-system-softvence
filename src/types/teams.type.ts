export type TTeamLead = {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
    employeeId: string;
    email: string;
    avatar: string;
    designation: string;
    role: string;
    userStatus: 'Active' | 'Deactivate';
};

export type TTeam = {
    _id: string;
    teamName: string;
    slug: string;
    teamlogo: string;
    teamDescription: string;
    status: 'Active' | 'Deactivate';
    teamLead: TTeamLead;
    createdAt: string;
    updatedAt: string;
    assignProjectCount: number;
    completedProjectCount: number;
};

export type TeamsApiResponse = {
    success: boolean;
    message: string;
    data: {
        data: TTeam[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    };
};
