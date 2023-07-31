import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserCryptService } from "./user.crypt";

@Module({
  controllers: [UserController],
  providers: [UserService, UserCryptService],
})
export class UserModule {}
