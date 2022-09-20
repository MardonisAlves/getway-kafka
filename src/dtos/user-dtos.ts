import { IsNotEmpty, IsString } from "class-validator";

export  class UserDtos{

    @IsNotEmpty()
    @IsString()
    name:string;
    
    @IsNotEmpty()
    @IsString()
    email:string;
}