import { Module } from '@nestjs/common';
import { Encrypter } from './encrypter';

@Module({
  providers: [Encrypter],
  exports: [Encrypter],
})
export class Utils {}
