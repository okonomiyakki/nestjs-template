import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '@core/config/validations/validation-schema';
import serverConfig from '@core/config/server.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      load: [serverConfig],
      isGlobal: true,
      validationSchema: validationSchema,
    }),
  ],
})
export class CoreModule {}
