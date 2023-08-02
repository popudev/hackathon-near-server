import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserPayload } from "types/responses";
import { JwtService } from "@nestjs/jwt";
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

  // @Get("mock")
  // mock() {
  //   const users = [
  //     {
  //       full_name: "Bui Manh Thanh",
  //       date_of_birth: "25/10/2002",
  //       email: "manhthanh147@gmail.com",
  //       phone: "0328735659",
  //       national_identity_card: "159753",
  //       national_identity_card_date: "25/10/2023",
  //     },
  //   ];
  //   return users.map((u) => this.userService.createStudentUser(u));
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post("/register-student")
  registerStudent(@Body() createUserDto: CreateUserDto) {
    return this.userService.createStudentUser(createUserDto);
  }

  @Post("/register-instructor")
  registerInstructor(@Body() createUserDto: CreateUserDto) {
    return this.userService.createStudentUser(createUserDto);
  }
}
