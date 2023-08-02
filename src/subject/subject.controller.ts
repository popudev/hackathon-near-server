import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";

@Controller("subject")
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get("/mock")
  mock() {
    // const createSubjectDto = {
    //   prerequisite_subject_id: "159753",
    //   thumbnail: "/static/images/software-development.jpg",
    //   title: "Giáo dục công dân",
    //   description: "Dạy cách làm người",
    //   number_of_credits: 8,
    //   price: 100000,
    // };
    // return this.subjectService.create(createSubjectDto);
  }
  @Get()
  findAll() {
    return this.subjectService.findAll();
  }
}
