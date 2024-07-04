import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NewUsersService } from './cron/newUsers.service';

export const handler = async () => {
  console.log('---- Running daily cron -----');
  const app = await NestFactory.createApplicationContext(AppModule);
  const newUsersService = app.get(NewUsersService);

  await newUsersService.sendEmail();

  await app.close();
};
