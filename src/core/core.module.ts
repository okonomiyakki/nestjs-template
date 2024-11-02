import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '@core/config/validations/validation-schema';
import serverConfig from '@core/config/server.config';
import databaseConfig from '@core/config/database.config';
import jwtConfig from '@core/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      load: [serverConfig, databaseConfig, jwtConfig],
      isGlobal: true,
      validationSchema: validationSchema,
    }),
  ],
})
export class CoreModule {}
