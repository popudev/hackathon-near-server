import { Injectable } from "@nestjs/common";
import * as crypto from "crypto-js";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
@Injectable()
export class CryptService {
  private encrypt(value: string) {
    if (!process.env.SERECT_KEY) throw new Error("Gắn serect key vô để mã hóa dữ liệu lưu xuống blockchain");
    const encryptedValue = crypto.AES.encrypt(value, process.env.SERECT_KEY).toString();
    return encryptedValue;
  }

  private decrypt(code: string) {
    if (!process.env.SERECT_KEY) throw new Error("Gắn serect key vô để mã hóa dữ liệu lưu xuống blockchain");
    return crypto.AES.decrypt(code, process.env.SERECT_KEY).toString();
  }

  public encryptCreateUserDto(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const usernameEncrypt = this.encrypt(username);
    const passwordEncrypt = this.encrypt(password);
    return { usernameEncrypt, passwordEncrypt };
  }

  public decryptLoginUserDto(loginInfo: LoginUserDto) {
    const { username, password } = loginInfo;
    const usernameDecrypted = this.decrypt(username);
    const passwordDecrypted = this.decrypt(password);
    return { usernameDecrypted, passwordDecrypted };
  }
}
