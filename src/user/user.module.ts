import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { CryptService } from "./crypt.service";

@Module({
  controllers: [UserController],
  providers: [UserService, CryptService],
})
export class UserModule {}
