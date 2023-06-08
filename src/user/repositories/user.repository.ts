import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

interface AddUser {
  name: string;
  lastName: string;
  username: string;
  password: string;
}

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async add(user: AddUser): Promise<User> {
    const resource = await this.save(user);
    return resource;
  }

  async findUserById(id: string): Promise<User> {
    return this.findOne({ where: { id } });
  }

  async findUsername(username: string): Promise<User> {
    return this.findOne({ where: { username } });
  }
}
