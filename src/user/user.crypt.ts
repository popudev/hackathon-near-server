import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { SecureCrypt } from "src/utils/secure.service";
@Injectable()
export class UserCryptService {
  public encryptCreateUserDto(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const usernameEncrypt = SecureCrypt.encrypt(username);
    const passwordEncrypt = SecureCrypt.encrypt(password);
    return { usernameEncrypt, passwordEncrypt };
  }

  public decryptLoginUserDto(loginInfo: LoginUserDto) {
    const { username, password } = loginInfo;
    const usernameDecrypted = SecureCrypt.decrypt(username);
    const passwordDecrypted = SecureCrypt.decrypt(password);
    return { usernameDecrypted, passwordDecrypted };
  }
}
