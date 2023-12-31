import { Injectable } from "@nestjs/common";
import { NearService } from "src/near/near.service";
import { NearContract } from "src/near/near.types";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { randomUUID } from "crypto";
import { UserMetadata } from "types/entities";
import { ActiveUserDto } from "./dto/active-user.dto";
import { AssignInstructorDto } from "./dto/assign-instructor.dto";
import { utils } from "near-api-js";
import { QueryStudentDto } from "./dto/query-student.dto";
import { UpdateScoreDto } from "./dto/update-score.dto";

@Injectable()
export class UserContract {
  private contract: NearContract;
  constructor(private readonly nearService: NearService) {
    this.nearService
      .getContract({
        viewMethods: ["get_all_user_metadata", "get_user_metadata_by_username"],
        changeMethods: [
          "create_instructor_user",
          "create_student_user",
          "create_admin_user",
          "active_student_user",
          "assignment",
          "active_instructor_user",
          "get_all_student_user_metadata_by_subject_id",
          "create_score",
        ],
      })
      .then((contract) => (this.contract = contract));
  }

  async createStudentUser(createUserDto: CreateUserDto) {
    return this.contract.create_student_user({
      args: {
        ...createUserDto,
      },
    });
  }

  async createInstructorUser(createUserDto: CreateUserDto) {
    return this.contract.create_instructor_user({
      args: {
        ...createUserDto,
      },
    });
  }

  async activeStudent(activeStudentDto: ActiveUserDto) {
    return this.contract.active_student_user({ ...activeStudentDto });
  }

  async activeInstructor(activeInstructorDto: ActiveUserDto) {
    return this.contract.active_instructor_user({ ...activeInstructorDto });
  }

  async assignInstructor(assignInstructor: AssignInstructorDto) {
    return this.contract.assignment({
      args: assignInstructor,
      amount: utils.format.parseNearAmount(assignInstructor.price.toString()),
    });
  }

  async createAdmin() {
    this.contract.create_admin_user({ username: "admin", password: "admin" });
  }

  async findUserByUsername(username: string): Promise<UserMetadata> {
    return this.contract.get_user_metadata_by_username({ username });
  }

  async findAllUser(): Promise<User[]> {
    return this.contract.get_all_user_metadata();
  }

  async getStudentBySubjectId(queryStudentDTO: QueryStudentDto): Promise<[UserMetadata]> {
    return this.contract.get_all_student_user_metadata_by_subject_id(queryStudentDTO);
  }

  async createScore(updateScoreDTO: UpdateScoreDto) {
    return this.contract.create_score(updateScoreDTO);
  }
}
