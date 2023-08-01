import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NearModule } from "./near/near.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { MajorModule } from "./major/major.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    NearModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
    UserModule,
    RoleModule,
    MajorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
