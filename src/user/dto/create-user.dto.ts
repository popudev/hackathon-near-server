import { Role } from "src/role/entities/role.entity";

export class CreateUserDto {
  id: string;
  nickname: String;
  role?: Role;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}
