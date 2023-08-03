import { Injectable } from "@nestjs/common";
import { NearService } from "src/near/near.service";
import { NearContract } from "src/near/near.types";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { Subject } from "./entities/subject.entity";
import { randomUUID } from "crypto";

@Injectable()
export class SubjectContract {
  private contract: NearContract;
  constructor(private readonly nearService: NearService) {
    this.nearService
      .getContract({
        viewMethods: ["get_all_subject_metadata"],
        changeMethods: ["create_subject"],
      })
      .then((contract) => (this.contract = contract));
  }

  async createSubject(createSubject: CreateSubjectDto) {
    console.log("createSubject: ", createSubject);
    const { major_id, thumbnail, prerequisite_subject_id, title, description, price, number_of_credits } =
      createSubject;

    return this.contract.create_subject({
      subject_id: randomUUID(),
      major_id,
      thumbnail,
      prerequisite_subject_id,
      title,
      description,
      price,
      number_of_credits,
    });
  }

  async findAllSubject(): Promise<Subject[]> {
    return this.contract.get_all_subject_metadata();
  }
}
