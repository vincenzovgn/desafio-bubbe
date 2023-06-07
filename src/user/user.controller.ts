import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdParams } from './dto/id-params.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      if (createUserDto.password !== createUserDto.passworldConfimation) {
        return new BadRequestException(new Error('Invalid param: password or passworldConfimation'));
      }
      await this.userService.create(createUserDto);
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Get()
  async findAll() {
    try {
      const resources = await this.userService.findAll();
      return resources;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Get(':id')
  async findOne(@Param() params: IdParams) {
    try {
      const resource = await this.userService.findOne(params.id);
      if (!resource) {
        return new NotFoundException('User not found');
      }
      return resource;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @Patch(':id')
  async update(@Param() params: IdParams, @Body() updateUserDto: UpdateUserDto) {
    const resource = await this.userService.update(params.id, updateUserDto);
    if (!resource.affected) {
      return false;
    }
    return true;
  }

  @Delete(':id')
  async remove(@Param() params: IdParams) {
    const resource = await this.userService.remove(params.id);
    if (!resource.affected) {
      return false;
    }
    return true;
  }
}
