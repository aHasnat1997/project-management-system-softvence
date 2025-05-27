type TAssignedTeam = {
  _id: string;
  teamName: string;
  slug: string;
  teamlogo: string;
  teamDescription: string;
  status: string;
  teamLead: string;
  teamMembers: string[];
  completedProjects: string[];
  assignProjects: string[];
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type TUserRef = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  isPasswordChanged: boolean;
  phoneNumber: string;
  avatar: string;
  designation: string;
  role: string;
  userStatus: "Active" | "Deactivate";
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TProject = {
  _id: string;
  clientName: string;
  sellsBy: TUserRef;
  orderStartDate: string;
  assignedTeam: TAssignedTeam[];
  assignedBy: TUserRef;
  leadBy: TUserRef;
  deliveryDate: string;
  platform: string;
  marketingProfile: string;
  projectStatus: "WIP" | "Completed" | "Pending" | string; // Add other possible statuses
  orderSheet: string;
  specialNote: string;
  createdAt: string;
  updatedAt: string;
};
