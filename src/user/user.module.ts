import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserCryptService } from "./user.crypt";
import { NearModule } from "src/near/near.module";
import { UserContract } from "./user.contract";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    NearModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserCryptService, UserContract],
  exports: [UserService],
})
export class UserModule {}
