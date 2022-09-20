import { IsEAN, IsNotEmpty, IsString } from 'class-validator';

export  class UserDtos{

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    email: string;
}