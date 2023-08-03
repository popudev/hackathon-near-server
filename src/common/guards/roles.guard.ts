import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { DecodeToken, JWTPayload } from "types";
import { UserMetadata } from "types/entities";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as DecodeToken<JWTPayload, UserMetadata>;
    if (!user) throw new HttpException("user invalid", HttpStatus.UNAUTHORIZED);

    return roles.includes(user.role);
  }
}
