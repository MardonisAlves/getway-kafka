import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, Res } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { UserDtos } from '../dtos/user.dtos';
import { ClientKafka } from '@nestjs/microservices';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';
@Controller('api/v1')
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject("TEST_SERVICE") private readonly testSerrvice: ClientKafka) { }

  @Post('create/user')
 async createUser(@Body() createuser: UserDtos, @Res() response:Response) {
    const create = await this.appService.createUser(createuser);
    return response.json(create)
  }

  @Get('verificar/user/:email')
  async verificarUser(
    @Param('email') email: string,
    @Res() response: Response) {
    const verificarUser = this.testSerrvice.send('verificar_user', {
      email: email
    });
    const getuser = await lastValueFrom(verificarUser);
    return response.json(getuser);
  }




  async onModuleInit() {
    this.testSerrvice.subscribeToResponseOf('verificar_user');
    await this.testSerrvice.connect()
  }
}

