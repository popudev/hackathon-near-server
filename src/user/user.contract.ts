import { Injectable } from "@nestjs/common";
import { NearService } from "src/near/near.service";
import { NearContract } from "src/near/near.types";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
@Injectable()
export class UserContract {
  private contract: NearContract;
  constructor(private readonly nearService: NearService) {
    this.nearService
      .getContract({
        viewMethods: ["get_all_user_metadata", "get_user_metadata_by_username"],
        changeMethods: ["create_user", "create_admin_user"],
      })
      .then((contract) => (this.contract = contract));
  }

  async createAdmin() {
    this.contract.create_admin_user({ username: "admin", password: "admin" });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { full_name, date_of_birth, email, phone, national_identity_card, national_identity_card_date } =
      createUserDto;
    return this.contract.create_user({
      full_name,
      date_of_birth,
      email,
      phone,
      national_identity_card,
      national_identity_card_date,
    });
  }

  async findUserByUsername(username: string) {
    return this.contract.get_user_metadata_by_username({ username });
  }

  async findAllUser(): Promise<User[]> {
    return this.contract.get_all_user_metadata();
  }
}
