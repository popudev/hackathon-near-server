import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { CryptService } from "./crypt.service";
@Injectable()
export class UserService {
  constructor(private readonly cryptService: CryptService) {}

  login(loginInfo: LoginUserDto) {
    return this.cryptService.decryptLoginUserDto(loginInfo);
  }

  create(createUserDto: CreateUserDto) {
    return this.cryptService.encryptCreateUserDto(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
