import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
const SALT = 15;

@Injectable()
export class Encripter {
  async encrypt(data: string | Buffer): Promise<string> {
    return bcrypt.hash(data, SALT);
  }

  async compare(data: string | Buffer, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
