import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { MajorService } from "./major.service";
import { CreateMajorDto } from "./dto/create-major.dto";
import { UpdateMajorDto } from "./dto/update-major.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles as Role } from "types";
import { Roles } from "@common/decorators/roles.decorator";

@Controller("major")
@UseGuards(AuthGuard, RolesGuard)
export class MajorController {
  constructor(private readonly majorService: MajorService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createMajorDto: CreateMajorDto) {
    return this.majorService.create(createMajorDto);
  }
  @Get("/mock")
  mock() {
    const createMajorDto = {
      thumbnail: "thanh",
      name: "thanh",
      description: "thanh",
      number_of_credits_required: 1,
    };
    return this.majorService.create(createMajorDto);
  }

  @Get()
  findAll() {
    return this.majorService.findAll();
  }
}
