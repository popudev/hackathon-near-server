import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthCrypt } from "./auth.crypt";
import { NearModule } from "src/near/near.module";
import { AuthContract } from "./auth.contract";

@Module({
  imports: [NearModule],
  controllers: [AuthController],
  providers: [AuthService, AuthCrypt, AuthContract],
  exports: [AuthService],
})
export class AuthModule {}
