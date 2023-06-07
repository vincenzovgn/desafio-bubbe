import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Utils } from 'src/utils/utils.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), Utils],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
