import { UserRole, UserStatus } from './user.enum';

export class CreateUserDto {
  name: string;
  username: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}

export class UpdateUserDto {
  name?: string;
  username?: string;
  password?: string;
  role?: UserRole;
  status?: UserStatus;
}
