import { Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class AppService {
  private orders: Order[] = [
    {
      id: 1,
      userId: 1,
      product: 'Laptop',
      quantity: 1,
      totalPrice: 1200,
      status: 'completed',
      createdAt: new Date(),
    },
    {
      id: 2,
      userId: 2,
      product: 'Mouse',
      quantity: 2,
      totalPrice: 50,
      status: 'pending',
      createdAt: new Date(),
    },
  ];
  private currentId = 3;

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: number): Order {
    const order = this.orders.find(order => order.id === id);
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return order;
  }

  findByUserId(userId: number): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }

  create(createOrderDto: CreateOrderDto): Order {
    const newOrder: Order = {
      id: this.currentId++,
      userId: createOrderDto.userId,
      product: createOrderDto.product,
      quantity: createOrderDto.quantity,
      totalPrice: createOrderDto.totalPrice,
      status: 'pending',
      createdAt: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  updateStatus(id: number, status: string): Order {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new Error(`Order with ID ${id} not found`);
    }
    
    this.orders[orderIndex].status = status;
    return this.orders[orderIndex];
  }

  remove(id: number): { deleted: boolean } {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new Error(`Order with ID ${id} not found`);
    }
    
    this.orders.splice(orderIndex, 1);
    return { deleted: true };
  }
}