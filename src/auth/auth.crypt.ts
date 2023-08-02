import { Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { SecureCrypt } from "src/utils/secure.service";
@Injectable()
export class AuthCrypt {
  public encryptLoginUserDto(loginUserDto: LoginUserDto) {
    const username = SecureCrypt.encrypt(loginUserDto.username);
    const password = SecureCrypt.encrypt(loginUserDto.password);
    return { username, password };
  }

  public decryptLoginUserDto(loginInfo: LoginUserDto) {
    const { username, password } = loginInfo;
    const usernameDecrypted = SecureCrypt.decrypt(username);
    const passwordDecrypted = SecureCrypt.decrypt(password);
    return { usernameDecrypted, passwordDecrypted };
  }
}
