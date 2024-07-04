import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NewUsersModule } from './cron/newUsers.module';

const config = configuration();
console.log('dburl - ', config.DB_URL);
console.log('dbname - ', config.DB_NAME);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(config.DB_URL, { dbName: config.DB_NAME }),
    AuthModule,
    NewUsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
