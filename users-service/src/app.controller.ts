import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_all_users' })
  getAllUsers() {
    console.log('Received: get_all_users');
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  getUserById(@Payload() id: number) {
    console.log('Received: get_user_by_id', id);
    return this.appService.findOne(id);
  }

  @MessagePattern({ cmd: 'create_user' })
  createUser(@Payload() createUserDto: CreateUserDto) {
    console.log('Received: create_user', createUserDto);
    return this.appService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'update_user' })
  updateUser(@Payload() payload: { id: number; data: Partial<CreateUserDto> }) {
    console.log('Received: update_user', payload);
    return this.appService.update(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_user' })
  deleteUser(@Payload() id: number) {
    console.log('Received: delete_user', id);
    return this.appService.remove(id);
  }
}