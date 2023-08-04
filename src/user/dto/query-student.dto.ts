import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class QueryStudentDto {
  @IsUUID()
  subject_id: string;
}
