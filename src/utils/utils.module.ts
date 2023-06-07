import { Module } from '@nestjs/common';
import { Encripter } from './encrypter';

@Module({
  providers: [Encripter],
  exports: [Encripter],
})
export class Utils {}
