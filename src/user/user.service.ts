import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserCryptService } from "./user.crypt";
import { UserContract } from "./user.contract";
@Injectable()
export class UserService {
  constructor(private readonly userCryptService: UserCryptService, private readonly userContract: UserContract) {}

  login(loginInfo: LoginUserDto) {
    return this.userCryptService.decryptLoginUserDto(loginInfo);
  }

  create(createUserDto: CreateUserDto) {
    return this.userCryptService.encryptCreateUserDto(createUserDto);
  }

  createUser(full_name: string) {
    return this.userContract.createUser(full_name);
  }
}
