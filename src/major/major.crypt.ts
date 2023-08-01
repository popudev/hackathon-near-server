import { Injectable } from "@nestjs/common";
import { CreateMajorDto } from "./dto/create-major.dto";
import { Major } from "./entities/major.entity";
import { SecureCrypt } from "src/utils/secure.service";

@Injectable()
export class MajorCryptService {
  public encryptCreateMajorDto(createMajorDto: CreateMajorDto) {
    const thumbnail = SecureCrypt.encrypt(createMajorDto.thumbnail);
    const name = SecureCrypt.encrypt(createMajorDto.name);
    const description = SecureCrypt.encrypt(createMajorDto.description);

    return { thumbnail, name, description };
  }

  public decryptMajor(major: Major) {
    const thumbnail = major.thumbnail && SecureCrypt.decrypt(major.thumbnail);
    const name = SecureCrypt.decrypt(major.name);
    const description = SecureCrypt.decrypt(major.description);
    return { ...major, thumbnail, name, description };
  }
}
