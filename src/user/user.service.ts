import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserCryptService } from "./user.crypt";
import { UserContract } from "./user.contract";
@Injectable()
export class UserService {
  constructor(private readonly userCryptService: UserCryptService, private readonly userContract: UserContract) {}

  create(createUserDto: CreateUserDto) {
    const userEncrypted = this.userCryptService.encryptCreateUserDto(createUserDto);
    return this.userContract.createUser(userEncrypted);
  }

  createAdmin() {
    console.log("createAdmin");
    return this.userContract.createAdmin();
  }

  async findAll() {
    const usersEncrypted = await this.userContract.findAllUser();
    console.log(usersEncrypted);
    return usersEncrypted.map((u) => this.userCryptService.decryptUser(u));
  }
}
