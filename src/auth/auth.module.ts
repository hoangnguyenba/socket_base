import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '../config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [
        ConfigModule,
      ],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
        };
      },
      inject: [
        ConfigService,
      ],
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
