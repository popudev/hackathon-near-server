export class CreateSubjectDto {
  subject_id?: string;
  major_id: string;
  thumbnail: string;
  title: string;
  description: string;
  number_of_credits: number;
  prerequisite_subject_id: string;
  price: number;
}
