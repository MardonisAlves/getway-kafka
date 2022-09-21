import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { UserDtos } from '../dtos/user.dtos';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create/user')
  createUser(@Body() createuser:UserDtos){
    try {
      return this.appService.createUser(createuser)
    } catch (error) {
      console.log(error);
    }
  }

}
