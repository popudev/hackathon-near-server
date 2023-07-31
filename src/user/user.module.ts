import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserCryptService } from "./user.crypt";
import { NearModule } from "src/near/near.module";
import { UserContract } from "./user.contract";

@Module({
  imports: [NearModule],
  controllers: [UserController],
  providers: [UserService, UserCryptService, UserContract],
  exports: [UserService],
})
export class UserModule {}
