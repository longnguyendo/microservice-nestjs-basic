import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date() },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date() },
  ];
  private currentId = 3;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.currentId++,
      name: createUserDto.name,
      email: createUserDto.email,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateData: Partial<CreateUserDto>): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateData,
    };
    
    return this.users[userIndex];
  }

  remove(id: number): { deleted: boolean } {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    this.users.splice(userIndex, 1);
    return { deleted: true };
  }
}