import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ScoreService } from "./score.service";
import { CreateScoreDto } from "./dto/create-score.dto";
import { UpdateScoreDto } from "./dto/update-score.dto";
import { AuthGuard } from "@common/guards/auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles as Role } from "types";
import { Roles } from "@common/decorators/roles.decorator";

@Controller("score")
@UseGuards(AuthGuard, RolesGuard)
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get("user/:id")
  @Roles(Role[Role.Admin], Role[Role.Student], Role[Role.Instructor])
  findScoreByUserId(@Param("id") id: string) {
    return this.scoreService.findScoreByUserId(id);
  }

  @Get("subject/:id")
  @Roles(Role[Role.Admin], Role[Role.Student], Role[Role.Instructor])
  findScoreBySubjecId(@Param("id") id: string) {
    return this.scoreService.findScoreBySubjecId(id);
  }
}
