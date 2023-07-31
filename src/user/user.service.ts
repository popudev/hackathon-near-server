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
    const userEncrypted = this.userCryptService.encryptLoginUserDto(loginInfo);
    console.log("userEncrypted: ", userEncrypted);
    const userDecrypted = this.userCryptService.decryptLoginUserDto(userEncrypted);
    console.log("userDecrypted: ", userDecrypted);
    return userDecrypted;
  }

  create(createUserDto: CreateUserDto) {
    const userEncrypted =  this.userCryptService.encryptCreateUserDto(createUserDto);
    return this.userContract.createUser(userEncrypted)
  }

  async findAll(){
    const usersEncrypted =  await this.userContract.findAllUser();
    return usersEncrypted.map(u=>this.userCryptService.decryptUser(u));
  }

}
