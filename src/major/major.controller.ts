import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { MajorService } from "./major.service";
import { CreateMajorDto } from "./dto/create-major.dto";
import { UpdateMajorDto } from "./dto/update-major.dto";

@Controller("major")
export class MajorController {
  constructor(private readonly majorService: MajorService) {}

  @Post()
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
