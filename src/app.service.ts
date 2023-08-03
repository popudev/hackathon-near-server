import { Injectable } from "@nestjs/common";
import { NearService } from "./near/near.service";
import { UserService } from "./user/user.service";
import { AuthService } from "./auth/auth.service";

@Injectable()
export class AppService {
  constructor(private readonly authenService: AuthService) {
    this.init();
  }
  async init() {
    try {
      this.authenService.createAdmin();
    } catch (e) {}
  }
}
