type TTeam = {
  _id: string;
  teamName: string;
  slug: string;
  teamlogo: string;
  teamDescription: string;
  status: 'active' | 'inactive' | string;
  teamLead: string;
  teamMembers: string[];
  completedProjects: string[];
  assignProjects: string[];
  members: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type TProjectRes = {
  _id: string;
  clientName: string;
  sellsBy: string | null;
  orderStartDate: string; // ISO date string
  assignedTeam: TTeam[];
  assignedBy: string | null;
  leadBy: string | null;
  deliveryDate: string; // ISO date string
  platfrom: string;
  marketingProfile: string;
  projectStatus: 'in_progress' | 'completed' | 'pending' | string;
  orderSheet: string;
  specialNote: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

