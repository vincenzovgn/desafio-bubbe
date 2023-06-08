import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdParams {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
