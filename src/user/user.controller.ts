import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserPayload } from "types/responses";
import { JwtService } from "@nestjs/jwt";
import { ActiveUserDto } from "./dto/active-user.dto";
import { AssignInstructorDto } from "./dto/assign-instructor.dto";
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  @Post("login")
  async login(@Body() LoginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response): Promise<UserPayload> {
    const { username, password } = LoginUserDto;
    const result = await this.userService.login({ username, password });
    if (result) {
      const accessToken = await this.jwtService.signAsync(result);
      res.status(HttpStatus.OK);
      return { accessToken, status: true };
    }
    res.status(HttpStatus.UNAUTHORIZED);
    return { accessToken: null, status: false };
  }

  @Get("createAdmin")
  createAdmin() {
    return this.userService.createAdmin();
  }

  @Get("login")
  test(@Body() LoginUserDto: LoginUserDto) {
    console.log("test");
  }

  @Get()
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

  @Put("/active/student")
  activeStudent(@Body() activeStudentDto: ActiveUserDto) {
    return this.userService.activeStudent(activeStudentDto);
  }
  @Put("/active/instructor")
  activeInstructor(@Body() activeInstructorDto: ActiveUserDto) {
    return this.userService.activeInstructor(activeInstructorDto);
  }

  @Put()
  assignInstructor(assignInstructor: AssignInstructorDto) {
    return this.userService.assignInstructor(assignInstructor);
  }
}
