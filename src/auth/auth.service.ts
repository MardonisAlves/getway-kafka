import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AuthDtos from 'src/dtos/auth.dtos';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private  jwtService: JwtService) {}

    async login(auth: AuthDtos, senha:string) { 
      const isPassword = await this.comparePassword(auth.senha, senha);
      if(isPassword){
        const payload = { username: auth.email, sub: auth.id };
        return {
          status:true,
          useremail:auth.email,
          access_token: this.jwtService.sign(payload),
        }
      }else{
        throw new HttpException('Acesso não autorizado!', HttpStatus.UNAUTHORIZED);
         
      }
    }

    async encryptPassword(cadastro:AuthDtos){
      const saltOrRounds = 10;
      const password = cadastro.senha;
      const hash = await bcrypt.hash(password, saltOrRounds); 
      return hash;
  }

  async comparePassword(senha:string, pass:string){
      const isMatch = await bcrypt.compare(pass, senha);
      return isMatch; 
  }
}
