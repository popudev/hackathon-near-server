import { Role } from "src/role/entities/role.entity";

export class CreateUserDto {
  full_name: string;
  date_of_birth: string;
  email: string;
  phone: string;
  national_identity_card: string;
  national_identity_card_date: string;
  // full_name, date_of_birth,email,phone,national_identity_card,national_identity_card_date
}
