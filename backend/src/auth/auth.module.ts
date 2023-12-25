import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { OtpModule } from 'src/otp/otp.module';
import { UserRepository } from 'src/user/user.repository';
import { MailModule } from 'src/mail/mail.module';
import { TokenModule } from 'src/token/token.module';
import { Http } from 'src/util/http';
import { MailRepository } from 'src/mail/mail.repository';
import { OtpRepository } from 'src/otp/otp.repository';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    OtpModule,
    MailModule,
    TokenModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get('JWT_PRIVATE_KEY'),
        publicKey: configService.get('JWT_PUBLIC_KEY'),
        signOptions: {
          // algorithm: 'RS256',
          expiresIn: '1d',
        },
        // verifyOptions: {
        //   algorithms: ['RS256'],
        // },
      }),
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    UserRepository,
    JwtStrategy,
    LocalStrategy,
    Http,
    MailRepository,
    OtpRepository,
  ],
})
export class AuthModule {}
