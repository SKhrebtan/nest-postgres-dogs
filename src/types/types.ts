import { Role } from 'src/role/roles.enum';

export interface IUser {
  name: string;
  id: number;
  email: string;
  role: Role[];
  avatar: string;
}
