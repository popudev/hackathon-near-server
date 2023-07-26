import { Module } from "@nestjs/common";
import { NearFactory } from "./near.config";
import { NearService } from "./near.service";

@Module({
  providers: [NearFactory, NearService],
  exports: [NearService],
})
export class NearModule {}
