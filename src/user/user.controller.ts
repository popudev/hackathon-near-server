import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@common/guards/auth.guard";
import { Roles } from "@common/decorators/roles.decorator";
import { Information } from "@common/decorators/information.decorator";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles as Role } from "types";

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
  @Roles(Role.Admin)
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
