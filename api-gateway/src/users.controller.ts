import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  @Get()
  async getAllUsers() {
    return this.usersClient
      .send({ cmd: 'get_all_users' }, {})
      .pipe(
        timeout(5000),
        catchError(error => {
          throw new HttpException(
            'Users service unavailable',
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }),
      );
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersClient
      .send({ cmd: 'get_user_by_id' }, parseInt(id))
      .pipe(
        timeout(5000),
        catchError(error => {
          throw new HttpException(
            error.message || 'User not found',
            HttpStatus.NOT_FOUND,
          );
        }),
      );
  }

  @Post()
  async createUser(@Body() createUserDto: any) {
    return this.usersClient
      .send({ cmd: 'create_user' }, createUserDto)
      .pipe(
        timeout(5000),
        catchError(error => {
          throw new HttpException(
            'Failed to create user',
            HttpStatus.BAD_REQUEST,
          );
        }),
      );
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: any) {
    return this.usersClient
      .send({ cmd: 'update_user' }, { id: parseInt(id), data: updateData })
      .pipe(
        timeout(5000),
        catchError(error => {
          throw new HttpException(
            error.message || 'Failed to update user',
            HttpStatus.BAD_REQUEST,
          );
        }),
      );
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersClient
      .send({ cmd: 'delete_user' }, parseInt(id))
      .pipe(
        timeout(5000),
        catchError(error => {
          throw new HttpException(
            error.message || 'Failed to delete user',
            HttpStatus.BAD_REQUEST,
          );
        }),
      );
  }
}