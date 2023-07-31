import { Injectable } from "@nestjs/common";
import { CreateMajorDto } from "./dto/create-major.dto";
import { UpdateMajorDto } from "./dto/update-major.dto";
import { MajorCryptService } from "./major.crypt";
import { Major } from "./entities/major.entity";

@Injectable()
export class MajorService {
  public constructor(private readonly majorCryptService: MajorCryptService) {}
  create(createMajorDto: CreateMajorDto) {
    return this.majorCryptService.encryptCreateMajorDto(createMajorDto);
  }

  findAll() {
    const majors = [] as Major[];
    return majors.map((major) => this.majorCryptService.decryptMajor(major));
  }
}
