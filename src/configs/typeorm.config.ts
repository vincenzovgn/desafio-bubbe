import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'bubbe',
  password: 'bubbe',
  database: 'bubbe',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
