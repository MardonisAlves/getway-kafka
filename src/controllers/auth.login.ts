import { Body, Controller, Inject, Post, OnModuleInit, Res, UseGuards, Get, Param } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { lastValueFrom } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import AuthDtos from "src/dtos/auth.dtos";
import { Response } from "express";
import { Public } from "src/decorators/decorators";

@ApiTags('Auth')
@Controller('api/v1')
export default class AuthLogin implements OnModuleInit {
    constructor(
        private readonly authService: AuthService,
        @Inject("TEST_SERVICE") private readonly testSerrvice: ClientKafka,
    ) { }

    @Public()
    @Post('/auth/login')
    async login(@Body() auth: AuthDtos, @Res() res: Response) {
        const user = this.testSerrvice.send('auth_login', auth);
        const data = await lastValueFrom(user);
                
        if (data.length === 0) {
            return res.json({
                message: 'Usuário não encontrado'
            })
        } else {
            const jwt = await this.authService.login(data[0], auth.senha)
            return res.json(jwt);
        }
    }
    
    
    @Post('/cadastro/user')
    async cadastroUser(@Body() cadastro: AuthDtos) {
        const hash = await this.authService.encryptPassword(cadastro);
        return this.testSerrvice.send('cadastro_user', {
            email: cadastro.email,
            senha: hash
        })
    }

    @Get('/auth/info/:email')
    async AuthInfo(@Param('email') email:string){
        return  this.testSerrvice.send('auth_info', email);
    }

    async onModuleInit() {
        this.testSerrvice.subscribeToResponseOf('auth_login');
        this.testSerrvice.subscribeToResponseOf('cadastro_user')
        this.testSerrvice.subscribeToResponseOf('auth_info')
        await this.testSerrvice.connect();
    }
}