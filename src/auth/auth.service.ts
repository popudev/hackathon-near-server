import { Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthContract } from "./auth.contract";
import { UserMetadata } from "types/entities";
import { UserCryptService } from "src/user/user.crypt";
import { SecureCrypt } from "src/utils/secure.service";

@Injectable()
export class AuthService {
  constructor(private readonly userCryptService: UserCryptService, private readonly authContract: AuthContract) {}

  async login(loginInfo: LoginUserDto): Promise<UserMetadata | null> {
    const { username, password } = loginInfo;
    const result = await this.authContract.findUserByUsername(username);
    const userDecrypt = this.userCryptService.decryptUser(result);
    if (result && SecureCrypt.decrypt(result.password) === password) return userDecrypt as UserMetadata;
    return null;
  }

  async createAdmin() {
    const admin: any = {
      username: "admin",
      password: "admin",
      user_id: "",
      full_name: "Admin",
      date_of_birth: "01/01/2002",
      email: "admin@gmail.com",
      national_identity_card: "123456",
      national_identity_card_date: "12/12",
      phone: "0909090909",
    };
    const result = await this.authContract.findUserByUsername(admin.username);
    if (result) return;

    const adminEncrypt = this.userCryptService.encryptCreateUserDto(admin);
    return this.authContract.createAdmin({
      ...adminEncrypt,
      username: admin.username,
      password: SecureCrypt.encrypt(admin.password),
    });
  }
}
