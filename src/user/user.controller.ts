import { Controller, Get, Post, Body, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "@common/guards/auth.guard";
import { Roles } from "@common/decorators/roles.decorator";
import { Information } from "@common/decorators/information.decorator";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles as Role } from "types";
import { ActiveUserDto } from "./dto/active-user.dto";
import { AssignInstructorDto } from "./dto/assign-instructor.dto";

@Controller("user")
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role[Role.Admin])
  findAll() {
    return this.userService.findAll();
  }

  @Post("/instructor/assignment")
  @Roles(Role[Role.Admin])
  assignInstructor(@Body() assignInstructor: AssignInstructorDto) {
    return this.userService.assignInstructor(assignInstructor);
  }

  @Get("/instructor")
  findInstructor() {
    return this.userService.findAllInstructor();
  }

  @Get("/student")
  findStudent() {
    return this.userService.findAllStudent();
  }

  @Post("/register-student")
  registerStudent(@Body() createUserDto: CreateUserDto) {
    return this.userService.createStudentUser(createUserDto);
  }

  @Post("/register-instructor")
  registerInstructor(@Body() createUserDto: CreateUserDto) {
    return this.userService.createInstructorUser(createUserDto);
  }

  @Put("/active/student")
  @Roles(Role[Role.Admin])
  activeStudent(@Body() activeStudentDto: ActiveUserDto) {
    return this.userService.activeStudent(activeStudentDto);
  }

  @Put("/active/instructor")
  @Roles(Role[Role.Admin])
  activeInstructor(@Body() activeInstructorDto: ActiveUserDto) {
    return this.userService.activeInstructor(activeInstructorDto);
  }
}
