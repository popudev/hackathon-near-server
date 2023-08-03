import { Controller, Post, Body, Res, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserPayload } from "types/responses";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private jwtService: JwtService) {}

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response): Promise<UserPayload> {
    const result = await this.authService.login(loginUserDto);
    if (result) {
      const accessToken = await this.jwtService.signAsync(result);
      res.status(HttpStatus.OK);
      return { accessToken, status: true };
    }
    res.status(HttpStatus.UNAUTHORIZED);
    return { accessToken: null, status: false };
  }
}
