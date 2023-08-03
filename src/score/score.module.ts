import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { ScoreContract } from './score.contract';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService,ScoreContract]
})
export class ScoreModule {}
