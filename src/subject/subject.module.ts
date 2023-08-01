import { Module } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { SubjectController } from "./subject.controller";
import { NearService } from "src/near/near.service";
import { NearModule } from "src/near/near.module";
import { SubjectContract } from "./subject.contract";

@Module({
  controllers: [SubjectController],
  providers: [SubjectService, SubjectContract],
  imports: [NearModule],
})
export class SubjectModule {}
