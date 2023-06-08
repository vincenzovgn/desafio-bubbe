import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { Utils } from 'src/utils/utils.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: `${configService.get('JWT_EXPIRES_SECOND')}s` },
    }),
    UserModule,
    Utils,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
