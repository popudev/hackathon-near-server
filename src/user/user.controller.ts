import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "@common/guards/auth.guard";
import { Roles } from "@common/decorators/roles.decorator";
import { Information } from "@common/decorators/information.decorator";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles as Role } from "types/entities";
import { ActiveUserDto } from "./dto/active-user.dto";

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

  @Post("/active/student")
  activeStudent(@Body() activeStudentDto: ActiveUserDto) {
    return this.userService.activeStudent(activeStudentDto);
  }
  @Post("/active/instructor")
  activeInstructor(@Body() activeInstructorDto: ActiveUserDto) {
    return this.userService.activeInstructor(activeInstructorDto);
  }
}
