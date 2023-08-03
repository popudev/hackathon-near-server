import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, UseGuards } from "@nestjs/common";
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

  @Get("test")
  @Roles(Role.Admin)
  test(@Information() userInformation) {
    console.log("Decor", userInformation);

    return {
      status: true,
    };
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.userService.findAll();
  }

  @Post("/instructor/assignment")
  assignInstructor(@Body() assignInstructor: AssignInstructorDto) {
    console.log("assignInstructor: ", assignInstructor);
    return this.userService.assignInstructor(assignInstructor);
  }

  @Get("/instructor")
  findInstructor() {
    return this.userService.findAllInstructor();
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
  activeStudent(@Body() activeStudentDto: ActiveUserDto) {
    return this.userService.activeStudent(activeStudentDto);
  }

  @Put("/active/instructor")
  activeInstructor(@Body() activeInstructorDto: ActiveUserDto) {
    return this.userService.activeInstructor(activeInstructorDto);
  }
}
