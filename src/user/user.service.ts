import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserCryptService } from "./user.crypt";
@Injectable()
export class UserService {
  constructor(private readonly userCryptService: UserCryptService) {}

  login(loginInfo: LoginUserDto) {
    return this.userCryptService.decryptLoginUserDto(loginInfo);
  }

  create(createUserDto: CreateUserDto) {
    return this.userCryptService.encryptCreateUserDto(createUserDto);
  }
}
