import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("login")
  login(@Body() LoginUserDto: LoginUserDto) {
    const user = { username: "thanh", password: "123" };
    return this.userService.login(user);
  }

  @Get("mock")
  mock(){
    const users = [
      {  full_name:"Bui Manh Thanh", date_of_birth:"25/10/2002",email:"manhthanh147@gmail.com",phone:"0328735659",national_identity_card:"159753",national_identity_card_date:"25/10/2023" },
    ]
    return users.forEach(u=>this.userService.create(u));
  }

  @Get()
  findAll(){
    return this.userService.findAll();
  }

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
