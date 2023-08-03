import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { ScoreContract } from './score.contract';
import { NearService } from 'src/near/near.service';
import { NearModule } from 'src/near/near.module';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService,ScoreContract],
  imports:[NearModule]
})
export class ScoreModule {}
