import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { Encripter } from 'src/utils/encrypter';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private encrypter: Encripter) {}
  async create(createUserDto: CreateUserDto) {
    const passwordEncrypt = await this.encrypter.encrypt(createUserDto.password);
    const userDto = Object.assign({}, createUserDto, { password: passwordEncrypt });
    const user = await this.userRepository.add(userDto);
    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: string) {
    return this.userRepository.findUserById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete({ id });
  }
}
