import { Injectable } from "@nestjs/common";
import { NearService } from "src/near/near.service";
import { NearContract } from "src/near/near.types";
import { UserMetadata } from "types/entities";
@Injectable()
export class AuthContract {
  private contract: NearContract;
  constructor(private readonly nearService: NearService) {
    this.nearService
      .getContract({
        viewMethods: ["get_user_metadata_by_username"],
        changeMethods: ["create_admin_user"],
      })
      .then((contract) => (this.contract = contract));
  }
  async createAdmin(account: { username: string; password: string }) {
    this.contract.create_admin_user(account);
  }
  async findUserByUsername(username: string): Promise<UserMetadata> {
    return this.contract.get_user_metadata_by_username({ username });
  }
}
