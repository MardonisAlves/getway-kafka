import { IsEAN, IsNotEmpty, IsString } from 'class-validator';

export  class UserDtos{

    @IsString()
    @IsNotEmpty()
    first_name: string;
    
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;
    
}