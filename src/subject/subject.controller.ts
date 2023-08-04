import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common";
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
  @Roles(Role[Role.Admin])
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get("/major/:id")
  findByMajorId(@Param("id") id: string) {
    return this.subjectService.findSubjectByMajorId(id);
  }

  @Get("/user/:id")
  @Roles(Role[Role.Admin], Role[Role.Student], Role[Role.Instructor])
  findByUserId(@Param("id") id: string) {
    return this.subjectService.findSubjectByUserId(id);
  }

  @Get()
  @Roles(Role[Role.Admin], Role[Role.Student], Role[Role.Instructor])
  findAll(@Request() req: any) {
    if (req.user?.role === "Admin") return this.subjectService.findAll();
    return this.subjectService.findSubjectByMajorId(req.user.major_id);
  }
}
