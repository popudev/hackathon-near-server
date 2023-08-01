import { Module } from "@nestjs/common";
import { MajorService } from "./major.service";
import { MajorController } from "./major.controller";
import { MajorCryptService } from "./major.crypt";
import { MajorContract } from "./major.contract";
import { NearModule } from "src/near/near.module";

@Module({
  controllers: [MajorController],
  providers: [MajorService, MajorCryptService, MajorContract],
  imports: [NearModule],
})
export class MajorModule {}
