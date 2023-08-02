import { Injectable } from "@nestjs/common";
import { NearService } from "src/near/near.service";
import { NearContract } from "src/near/near.types";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { randomUUID } from "crypto";
@Injectable()
export class UserContract {
  private contract: NearContract;
  constructor(private readonly nearService: NearService) {
    this.nearService
      .getContract({
        viewMethods: ["get_all_user_metadata"],
        changeMethods: ["create_student_user"],
      })
      .then((contract) => (this.contract = contract));
  }

  async createUser(createUserDto: CreateUserDto) {
    const { full_name, date_of_birth, email, phone, national_identity_card, national_identity_card_date } =
      createUserDto;
    return this.contract.create_student_user({
      args: {
        user_id: randomUUID(),
        full_name,
        date_of_birth,
        email,
        phone,
        national_identity_card,
        national_identity_card_date,
      },
    });
  }

  async findAllUser(): Promise<User[]> {
    return this.contract.get_all_user_metadata();
  }
}
