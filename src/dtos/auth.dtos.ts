import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsSemVer, IsString } from "class-validator";

export default class AuthDtos{
    @ApiProperty({
        example:'mardonisgp@gmail.com'
    })
    @IsNotEmpty()
    @IsString()
    email:string;

    @ApiProperty({
        example:'jk8yup02@'
    })
    @IsNotEmpty()
    @IsString()
    senha:string;

    @IsOptional()
    id:string;
}