import { Body, Controller, Delete, Get, Inject, OnModuleInit, Param, Post, Put, Res } from '@nestjs/common';
import { UserDtos } from '../dtos/user.dtos';
import { ClientKafka } from '@nestjs/microservices';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';
@Controller('api/v1')
export class AppController implements OnModuleInit {
  constructor(
  @Inject("TEST_SERVICE") private readonly testSerrvice: ClientKafka) { }

  @Post('create/user')
 async createUser(@Body() createuser: UserDtos, @Res() response:Response) {
    const create =  this.testSerrvice.send('create_user',createuser);
    const res = await lastValueFrom(create);
    return response.json(res)
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


  @Delete('delete/user/:id')
  async deleteUser(@Param('id') id:string){
   return  this.testSerrvice.send('delete_user',id);  
  }

  @Put('update/user/:id')
  async updateUser(
    @Body() user:UserDtos,
    @Param('id') id:string
  ){
    const updateuser = {...user,id}
    return this.testSerrvice.send('update_user',updateuser);
  }

  @Get('all/users')
  async allUsers(){
    return this.testSerrvice.send('all_users',{})
  }

  async onModuleInit() {
    this.testSerrvice.subscribeToResponseOf('verificar_user');
    this.testSerrvice.subscribeToResponseOf('delete_user');
    this.testSerrvice.subscribeToResponseOf('create_user');
    this.testSerrvice.subscribeToResponseOf('update_user');
    this.testSerrvice.subscribeToResponseOf('all_users');
    await this.testSerrvice.connect();
  }
}

