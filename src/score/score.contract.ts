import { Injectable } from "@nestjs/common";
import { NearService } from "src/near/near.service";
import { NearContract } from "src/near/near.types";
import { randomUUID } from "crypto";

@Injectable()
export class ScoreContract {
  private contract: NearContract;
  constructor(private readonly nearService: NearService) {
    this.nearService
      .getContract({
        viewMethods: ["get_all_score_metadata_by_user_id", "get_all_score_metadata_by_subject_id"],
        changeMethods: [],
      })
      .then((contract) => (this.contract = contract));
  }

  findScoreByUserId(user_id: string) {
    return this.contract.get_all_score_metadata_by_user_id({ user_id });
  }

  findScoreBySubjecId(subject_id: string) {
    return this.contract.get_all_score_metadata_by_subject_id({ subject_id });
  }
}
