import { ApiProperty } from "@nestjs/swagger";

export default class ResponseCreateUser{
   @ApiProperty({
    example:'Usuario cadastrado com sucrsso'
   })
   message:string

   @ApiProperty({
    example:'Usuario ja está cadastradro'
   })
   usuario:string

}