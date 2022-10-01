import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsString } from 'class-validator';

export  class UserDtos{
    @ApiProperty({
        example:'Mardonis'
    })
    @IsString()
    @IsNotEmpty()
    first_name: string;
    
    @ApiProperty({
        example:'mardonis.bezerra@gmail.com'
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example:'Alves B'
    })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({
        example:'85992590075'
    })
    @IsString()
    @IsNotEmpty()
    phone: string;
    
}