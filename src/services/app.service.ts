import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserDtos } from '../dtos/user.dtos';

@Injectable()
export class AppService {
  constructor(@Inject("TEST_SERVICE") private readonly testSerrvice: ClientKafka){}
  getHello(): string {
    return 'Hello World Kafka!';
  }

  createUser(user:UserDtos){
    this.testSerrvice.emit('create_user',user);
  }
}
