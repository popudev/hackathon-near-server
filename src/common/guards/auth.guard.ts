import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { DecodeToken, JWTPayload } from "types";
import { UserMetadata } from "types/entities";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>("roles", context.getHandler());

    if (!roles) return true;

    const accessToken = request.headers?.authorization?.replace("Bearer ", "");
    if (!accessToken) throw new HttpException("accessToken is required", HttpStatus.UNAUTHORIZED);

    const payload = await this.jwtService.decode<DecodeToken<JWTPayload, UserMetadata>>(accessToken);
    if (!payload) throw new HttpException("accessToken is invalid", HttpStatus.UNAUTHORIZED);
    request.user = payload;
    return true;
  }
}
