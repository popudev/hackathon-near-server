import { Injectable } from "@nestjs/common";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { SubjectContract } from "./subject.contract";

@Injectable()
export class SubjectService {
  constructor(private readonly subjectContract: SubjectContract) {}
  create(createSubjectDto: CreateSubjectDto) {
    return this.subjectContract.createSubject(createSubjectDto);
  }

  findAll() {
    return this.subjectContract.findAllSubject();
  }

  findSubjectByMajorId(id:string){
    return this.subjectContract.findAllSubjectByMajorId(id);
  }
}
