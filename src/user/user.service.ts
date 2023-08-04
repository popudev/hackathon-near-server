import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserCryptService } from "./user.crypt";
import { UserContract } from "./user.contract";
import { UserMetadata } from "types/entities";
import { ActiveUserDto } from "./dto/active-user.dto";
import { AssignInstructorDto } from "./dto/assign-instructor.dto";
import { QueryStudentDto } from "./dto/query-student.dto";
import { User } from "./entities/user.entity";
import { UpdateScoreDto } from "./dto/update-score.dto";
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
    return usersEncrypted.map((u) => this.userCryptService.decryptUser(u));
  }

  async findAllInstructor() {
    const users = await this.findAll();
    return users.filter((u) => u.role === "Instructor");
  }

  async findAllStudent() {
    const users = await this.findAll();
    return users.filter((u) => u.role === "Student");
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

  async getStudentBySubjectId(queryStudentDTO: QueryStudentDto) {
    const result = await this.userContract.getStudentBySubjectId(queryStudentDTO);
    const dataDecrypted: [UserMetadata] = [] as unknown as [UserMetadata];
    result.forEach((element) => {
      dataDecrypted.push(this.userCryptService.decryptUser(element));
    });
    return dataDecrypted;
  }

  async createScore(updateScoreDto: UpdateScoreDto) {
    return this.userContract.createScore(updateScoreDto);
  }
}
