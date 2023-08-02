import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserCryptService } from "./user.crypt";
import { UserContract } from "./user.contract";
import { UserMetadata } from "types/entities";
@Injectable()
export class UserService {
  constructor(private readonly userCryptService: UserCryptService, private readonly userContract: UserContract) {}

  async login(loginInfo: LoginUserDto): Promise<UserMetadata | null> {
    const { username, password } = loginInfo;
    const result = await this.userContract.findUserByUsername(username);
    if (result && result.password === password) return result;
    return null;
  }

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

  async findAllInstructor() {
    const users = await this.findAll();
    return users.map((u) => u);
  }
}
