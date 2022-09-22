import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UserDtos } from '../dtos/user.dtos';

@Injectable()
export class AppService implements OnModuleInit{
  constructor(@Inject("TEST_SERVICE") private readonly testSerrvice: ClientKafka){}
 
 async createUser(user:UserDtos){
  try {
    const createUser = this.testSerrvice.send('create_user',user);
    const res = await lastValueFrom(createUser);
    return res;
    
  } catch (error) {
    console.log(error);
    
  }
  }

  async onModuleInit() {
    this.testSerrvice.subscribeToResponseOf('create_user');
    await this.testSerrvice.connect()
  }
}
