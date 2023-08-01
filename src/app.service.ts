import { Injectable } from "@nestjs/common";
import { NearService } from "./near/near.service";
import { UserService } from "./user/user.service";

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}
}
