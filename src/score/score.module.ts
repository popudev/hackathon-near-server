import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { SubjectContract } from './score.contract';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService,SubjectContract]
})
export class ScoreModule {}
