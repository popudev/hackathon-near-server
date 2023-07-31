import { Role } from "src/role/entities/role.entity";

export class CreateUserDto {
  username: string;
  password: string;
  nickname: String;
  role?: Role;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}
