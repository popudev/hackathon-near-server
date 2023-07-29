import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  login(@Body() createUserDto: LoginUserDto) {
    const user = { username: "thanh", password: "123", age: 8 };
    return this.userService.login(user);
  }

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
