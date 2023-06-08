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
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdParams } from './dto/id-params.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      if (createUserDto.password !== createUserDto.passworldConfimation) {
        return new BadRequestException(new Error('Invalid param: password or passworldConfimation'));
      }
      await this.userService.create(createUserDto);
    } catch (error) {
      console.log(JSON.stringify(error));
      return new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    try {
      const resources = await this.userService.findAll();
      return resources;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param() params: IdParams, @Body() updateUserDto: UpdateUserDto) {
    const resource = await this.userService.update(params.id, updateUserDto);
    if (!resource.affected) {
      return false;
    }
    return true;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param() params: IdParams) {
    const resource = await this.userService.remove(params.id);
    if (!resource.affected) {
      return false;
    }
    return true;
  }
}
