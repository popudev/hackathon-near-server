import { Injectable } from "@nestjs/common";
import { NearService } from "src/near/near.service";
import { NearContract } from "src/near/near.types";
@Injectable()
export class UserContract {
  private contract: NearContract;
  constructor(private readonly nearService: NearService) {
    this.nearService
      .getContract({
        viewMethods: ["get_all_user"],
        changeMethods: ["create_user"],
      })
      .then((contract) => (this.contract = contract));
  }

  async createUser(full_name: string) {
    return this.contract.create_user({
      args: {
        full_name,
      },
    });
  }
}
