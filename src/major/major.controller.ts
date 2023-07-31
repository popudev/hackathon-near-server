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

  @Get()
  findAll() {
    return this.majorService.findAll();
  }
}
