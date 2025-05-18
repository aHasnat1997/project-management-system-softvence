export type TUserRole = 'SUPER_ADMIN' | 'ADMIN' | 'PROJECT_MANAGER' | 'ENGINEER' | 'CLIENT';

export type TUser = {
  id: string,
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  role: TUserRole;
};
