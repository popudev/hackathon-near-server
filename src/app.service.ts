import { Injectable } from "@nestjs/common";
import { NearService } from "./near/near.service";

@Injectable()
export class AppService {
  constructor(private readonly nearService: NearService) {}
  getHello(): string {
    console.log(this.nearService.getAccount());

    return "Hello World!";
  }
}
