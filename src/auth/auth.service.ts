import { Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthCrypt } from "./auth.crypt";
import { AuthContract } from "./auth.contract";
import { UserMetadata } from "types/entities";
@Injectable()
export class AuthService {
  constructor(private readonly authCrypt: AuthCrypt, private readonly authContract: AuthContract) {}

  async login(loginInfo: LoginUserDto): Promise<UserMetadata | null> {
    const { username, password } = loginInfo;
    const result = await this.authContract.findUserByUsername(username);
    if (result && result.password === password) return result;
    return null;
  }
  createAdmin() {
    return this.authContract.createAdmin();
  }
}
