export interface updateUser {
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isActive: boolean;
  token: string;
  avatar: string;
  deleteFlag: boolean;
  isDarkTheme?: boolean;
}
