import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export default class AppServiceTes implements OnModuleInit{
    constructor(@Inject("TEST_SERVICE") private readonly testSerrvice: ClientKafka) { }

  async  onModuleInit() {
     this.testSerrvice.subscribeToResponseOf('create_user');
     await this.testSerrvice.connect();
    }
    
}