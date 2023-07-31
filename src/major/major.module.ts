import { Module } from "@nestjs/common";
import { MajorService } from "./major.service";
import { MajorController } from "./major.controller";
import { MajorCryptService } from "./major.crypt";

@Module({
  controllers: [MajorController],
  providers: [MajorService, MajorCryptService],
})
export class MajorModule {}
