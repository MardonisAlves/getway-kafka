import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDtos } from './dtos/user-dtos';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create/user')
  createUser(@Body() createuser:UserDtos){
    try {
      console.log(createuser);
      
      return;
      return this.appService.createUser(createuser)
    } catch (error) {
      console.log(error);
      
    }
  }

}
