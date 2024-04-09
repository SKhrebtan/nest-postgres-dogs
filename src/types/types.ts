import { Role } from 'src/role/roles.enum';

export interface IUser {
  id: number;
  email: string;
  role: Role[];
  avatar: string;
}
