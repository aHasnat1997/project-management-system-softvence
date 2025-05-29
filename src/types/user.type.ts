export type TUserRole = 'Admin' | 'Management' | 'Sells' | 'Operation';

export type TJwtPayload = {
  id: string;
  role: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
};

export type TCurrentLoginUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: TUserRole;
  iat: number;
  exp: number;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type TEmployee = {
  _id: string
  avatar: string
  createdAt: string
  updatedAt: string
  designation: string
  email: string
  employeeId: string
  firstName: string
  lastName: string
  userName: string
  phoneNumber: string
  role: TUserRole
  userStatus: 'Active' | 'Deactivate'
  team?: string
  teamLead?: string
  address?: string
  subArea?: string
  district?: string
  state?: string
  country?: string
  isBlocked: boolean
  isDeleted: boolean
  isPasswordChanged: boolean
};
