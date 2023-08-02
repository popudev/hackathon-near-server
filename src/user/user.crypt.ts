import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { SecureCrypt } from "src/utils/secure.service";
import { User } from "./entities/user.entity";
@Injectable()
export class UserCryptService {
  public encryptCreateUserDto(createUserDto: CreateUserDto) {
    const full_name = SecureCrypt.encrypt(createUserDto.full_name);
    const date_of_birth = SecureCrypt.encrypt(createUserDto.date_of_birth);
    const email = SecureCrypt.encrypt(createUserDto.email);
    const phone = SecureCrypt.encrypt(createUserDto.phone);
    const national_identity_card = SecureCrypt.encrypt(createUserDto.national_identity_card);
    const national_identity_card_date = SecureCrypt.encrypt(createUserDto.national_identity_card_date);
    return { full_name, date_of_birth, email, phone, national_identity_card, national_identity_card_date };
  }

  public decryptUser(user: User) {
    const full_name = SecureCrypt.decrypt(user.full_name);
    const date_of_birth = SecureCrypt.decrypt(user.date_of_birth);
    const email = SecureCrypt.decrypt(user.email);
    const phone = SecureCrypt.decrypt(user.phone);
    const national_identity_card = SecureCrypt.decrypt(user.national_identity_card);
    const national_identity_card_date = SecureCrypt.decrypt(user.national_identity_card_date);
    return { ...user, full_name, date_of_birth, email, phone, national_identity_card, national_identity_card_date };
  }
}
