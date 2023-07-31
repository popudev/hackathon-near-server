import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NearModule } from "./near/near.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { MajorModule } from './major/major.module';

@Module({
  imports: [
    NearModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    RoleModule,
    MajorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
