import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Encrypter } from 'src/utils/encrypter';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private encrypter: Encrypter, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('Invalid params: username or password');
    }
    const isMatch = await this.encrypter.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { ...result, loginAt: new Date().toISOString() };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }
}
