import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  @Post("login")
  async login(@Body() LoginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const { username, password } = LoginUserDto;
    const result = await this.userService.login({ username, password });
    if (result) {
      const accessToken = await this.jwtService.signAsync(result);
      res.status(HttpStatus.OK).send({ accessToken, status: false });
      return;
    }
    res.status(HttpStatus.UNAUTHORIZED).send({ accessToken: null, status: true });
  }

  @Get("createAdmin")
  createAdmin() {
    return this.userService.createAdmin();
  }

  @Get("login")
  test(@Body() LoginUserDto: LoginUserDto) {
    console.log("test");
  }

  @Get("mock")
  mock() {
    const users = [
      {
        full_name: "Bui Manh Thanh",
        date_of_birth: "25/10/2002",
        email: "manhthanh147@gmail.com",
        phone: "0328735659",
        national_identity_card: "159753",
        national_identity_card_date: "25/10/2023",
      },
    ];
    return users.forEach((u) => this.userService.create(u));
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
