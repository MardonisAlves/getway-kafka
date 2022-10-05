import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import AuthLogin from './controllers/auth.login';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    ClientsModule.register([
      {
        name: process.env.NAME_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.CLIENT_ID,
            brokers: [process.env.KAFKA_BROUKER]
          }
        }
      }
    ]),
    AuthModule
  ],
  controllers: [AppController, AuthLogin],
  providers: [],
})
export class AppModule { }
