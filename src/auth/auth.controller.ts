import { Controller, Get, Post, Body, Res, HttpStatus, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";

import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserPayload } from "types/responses";
import { AuthCrypt } from "./auth.crypt";
import { EncryptPipe } from "@common/pipes/encrypt.pipe";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private authCrypt: AuthCrypt
  ) {}

  @Get("createAdmin")
  createAdmin() {
    return this.authService.createAdmin(this.authCrypt.encryptAuthDto({ username: "admin", password: "admin" }));
  }
  @Post("login")
  @UsePipes(new EncryptPipe())
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response): Promise<UserPayload> {
    // const authEncrypted = this.authCrypt.encryptAuthDto(loginUserDto);
    console.log(loginUserDto);

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
