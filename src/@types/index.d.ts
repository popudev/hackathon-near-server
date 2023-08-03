import * as JwtService from "@nestjs/jwt";
declare module "@nestjs/jwt" {
  interface JwtService {
    decode<T>(token: string, options?: jwt.DecodeOptions): Promise<T>;
  }
}
