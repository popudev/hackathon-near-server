import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthCrypt } from "./auth.crypt";
import { NearModule } from "src/near/near.module";
import { AuthContract } from "./auth.contract";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [NearModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthCrypt, AuthContract],
  exports: [AuthService],
})
export class AuthModule {}
