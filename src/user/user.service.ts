import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserCryptService } from "./user.crypt";
import { UserContract } from "./user.contract";
import { UserMetadata } from "types/entities";
import { ActiveUserDto } from "./dto/active-user.dto";
import { AssignInstructorDto } from "./dto/assign-instructor.dto";
@Injectable()
export class UserService {
  constructor(private readonly userCryptService: UserCryptService, private readonly userContract: UserContract) {}

  createStudentUser(createUserDto: CreateUserDto) {
    const userEncrypted = this.userCryptService.encryptCreateUserDto(createUserDto);
    return this.userContract.createStudentUser({
      user_id: createUserDto.user_id,
      ...userEncrypted,
    });
  }

  createInstructorUser(createUserDto: CreateUserDto) {
    const userEncrypted = this.userCryptService.encryptCreateUserDto(createUserDto);
    return this.userContract.createInstructorUser({
      user_id: createUserDto.user_id,
      ...userEncrypted,
    });
  }

  async findAll() {
    const usersEncrypted = await this.userContract.findAllUser();
    console.log(usersEncrypted);
    return usersEncrypted.map((u) => this.userCryptService.decryptUser(u));
  }

  async findAllInstructor() {
    const users = await this.findAll();
    return users.map((u) => u.role === "Instructor");
  }

  async activeStudent(activeStudentDto: ActiveUserDto) {
    const userEncrypted = this.userCryptService.encyptActiveUserDto(activeStudentDto);
    return this.userContract.activeStudent(userEncrypted);
  }
  async activeInstructor(activeInstructorDto: ActiveUserDto) {
    const userEncrypted = this.userCryptService.encyptActiveUserDto(activeInstructorDto);
    return this.userContract.activeInstructor(userEncrypted);
  }
  async assignInstructor(assignInstructorDto: AssignInstructorDto) {
    return this.userContract.assignInstructor(assignInstructorDto);
  }
}
