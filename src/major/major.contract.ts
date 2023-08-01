import { Injectable } from "@nestjs/common";
import { NearService } from "src/near/near.service";
import { NearContract } from "src/near/near.types";
import { CreateMajorDto } from "./dto/create-major.dto";
import { Major } from "./entities/major.entity";

@Injectable()
export class MajorContract {
  private contract: NearContract;
  constructor(private readonly nearService: NearService) {
    this.nearService
      .getContract({
        viewMethods: ["get_all_major_metadata"],
        changeMethods: ["create_major"],
      })
      .then((contract) => (this.contract = contract));
  }

  async createMajor(createMajorDto: CreateMajorDto) {
    const { major_id, thumbnail, name, description, number_of_credits_required } = createMajorDto;
    return this.contract.create_major({
      args: {
        major_id,
        thumbnail,
        name,
        description,
        number_of_credits_required,
      },
    });
  }

  async findAllMajor(): Promise<Major[]> {
    return this.contract.get_all_major_metadata();
  }
}
