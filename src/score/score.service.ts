import { Injectable } from "@nestjs/common";
import { CreateScoreDto } from "./dto/create-score.dto";
import { UpdateScoreDto } from "./dto/update-score.dto";
import { ScoreContract } from "./score.contract";

@Injectable()
export class ScoreService {
  constructor(private readonly scoreContract: ScoreContract) {}
  findScoreByUserId(id: string) {
    return this.scoreContract.findScoreByUserId(id);
  }
}
