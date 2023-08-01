import { Injectable } from "@nestjs/common";
import { CreateMajorDto } from "./dto/create-major.dto";
import { UpdateMajorDto } from "./dto/update-major.dto";
import { MajorCryptService } from "./major.crypt";
import { Major } from "./entities/major.entity";
import { MajorContract } from "./major.contract";
import { randomUUID } from "crypto";
@Injectable()
export class MajorService {
  public constructor(
    private readonly majorCryptService: MajorCryptService,
    private readonly majorContract: MajorContract
  ) {}

  async create(createMajorDto: CreateMajorDto) {
    const createMajorEncrypted = this.majorCryptService.encryptCreateMajorDto(createMajorDto);
    const { number_of_credits_required } = createMajorDto;
    return this.majorContract.createMajor({
      ...createMajorEncrypted,
      major_id: randomUUID(),
      number_of_credits_required,
    });
  }

  async findAll() {
    const majors = await this.majorContract.findAllMajor();
    return majors.map((major) => this.majorCryptService.decryptMajor(major));
  }
}
