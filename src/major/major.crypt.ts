import { Injectable } from "@nestjs/common";
import { CreateMajorDto } from "./dto/create-major.dto";
import { Major } from "./entities/major.entity";
import { SecureCrypt } from "src/utils/secure.service";

@Injectable()
export class MajorCryptService {
  public encryptCreateMajorDto(createMajorDto: CreateMajorDto) {
    const { thumbnail, name, description } = createMajorDto;

    const thumbnail_encrypt = thumbnail && SecureCrypt.encrypt(thumbnail);
    const name_encrypt = SecureCrypt.encrypt(name);
    const description_encrypt = SecureCrypt.encrypt(description);

    return { thumbnail_encrypt, name_encrypt, description_encrypt };
  }

  public decryptMajor(major: Major) {
    const { thumbnail, name, description } = major;
    const thumbnail_decrypt = thumbnail && SecureCrypt.decrypt(thumbnail);
    const name_decrypt = SecureCrypt.decrypt(name);
    const description_decrypt = SecureCrypt.decrypt(description);
    return { thumbnail_decrypt, name_decrypt, description_decrypt };
  }
}
