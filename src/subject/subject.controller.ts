import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles as Role } from "types";
import { Roles } from "@common/decorators/roles.decorator";
@Controller("subject")
@UseGuards(AuthGuard, RolesGuard)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get("/mock")
  mock() {
    const createSubjectDto = {
      prerequisite_subject_id: "159753",
      thumbnail: "/static/images/software-development.jpg",
      title: "Giáo dục công dân",
      description: "Dạy cách làm người",
      number_of_credits: 8,
      price: 100000,
    };
    return this.subjectService.create(createSubjectDto);
  }
  @Get()
  findAll() {
    return this.subjectService.findAll();
  }
}
