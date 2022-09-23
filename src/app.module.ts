import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

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
    ])
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
