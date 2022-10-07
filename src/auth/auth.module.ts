import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-guard';


@Module({
  imports:[ 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
   ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    AuthService, 
    LocalStrategy, 
    JwtStrategy
  ],
  exports:[AuthService]

})
export class AuthModule {}
