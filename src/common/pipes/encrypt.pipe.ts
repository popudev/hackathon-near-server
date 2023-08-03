import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { SecureCrypt } from "src/utils/secure.service";
import _ from "lodash";

export class EncryptPipe<T extends Record<any, any>> implements PipeTransform {
  constructor(private blacklist: [keyof T]) {}
  transform(body: T, metadata: ArgumentMetadata): T {
    let result: Record<any, any> = {};
    console.log(metadata);

    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        // if (body[key] === "" || _.isEmpty(body[key])) throw new Error("Invalid object, object has empty properties !");
        if (!this.blacklist.includes(key)) {
          const value = SecureCrypt.encrypt(body[key]);
          result = { ...result, [key]: value };
        } else {
          result = { ...result, [key]: body[key] };
        }
      }
    }
    return result;
  }
}
