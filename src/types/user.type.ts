export type TUserRole = 'SUPER_ADMIN' | 'ADMIN' | 'PROJECT_MANAGER' | 'ENGINEER' | 'CLIENT';

export type TUser = {
  id: string,
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  role: TUserRole;
};

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
  role: string;
  iat: number;
  exp: number;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
