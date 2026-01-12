import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_all_orders' })
  getAllOrders() {
    console.log('Received: get_all_orders');
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: 'get_order_by_id' })
  getOrderById(@Payload() id: number) {
    console.log('Received: get_order_by_id', id);
    return this.appService.findOne(id);
  }

  @MessagePattern({ cmd: 'get_orders_by_user' })
  getOrdersByUser(@Payload() userId: number) {
    console.log('Received: get_orders_by_user', userId);
    return this.appService.findByUserId(userId);
  }

  @MessagePattern({ cmd: 'create_order' })
  createOrder(@Payload() createOrderDto: CreateOrderDto) {
    console.log('Received: create_order', createOrderDto);
    return this.appService.create(createOrderDto);
  }

  @MessagePattern({ cmd: 'update_order_status' })
  updateOrderStatus(@Payload() payload: { id: number; status: string }) {
    console.log('Received: update_order_status', payload);
    return this.appService.updateStatus(payload.id, payload.status);
  }

  @MessagePattern({ cmd: 'delete_order' })
  deleteOrder(@Payload() id: number) {
    console.log('Received: delete_order', id);
    return this.appService.remove(id);
  }
}