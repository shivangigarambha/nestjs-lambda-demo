import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from '../schema/user.schema';

@Injectable()
export class NewUsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly mailerService: MailerService
  ) {}

  async sendEmail() {
    try {
      const now = new Date();
      const startOfDay = new Date(now.setHours(0, 0, 0, 0));
      const endOfDay = new Date(now.setHours(23, 59, 59, 999));
      console.log(`Emailing the users registered between ${startOfDay} to ${endOfDay}`);

      const users = await this.userModel.find(
        { createdAt: { $gt: startOfDay, $lte: endOfDay }}, 
        { email: 1 }
      );
      console.log('Total Users -', users.length);

      const subject = `New Registered users on ${startOfDay}`;
      let emailtext = '';
      users.map((user, index) => emailtext += `
        ${index+1}. ${user.email}`
      );
      console.log('Subject - ', subject);
      console.log('EmailText - ', emailtext);

      // TODO: Enable this when actual value is added in env
      // await this.mailerService.sendMail({
      //   from: process.env.SMTP_EMAIL_FROM,
      //   to: process.env.SMTP_EMAIL_TO,
      //   subject,
      //   text: emailtext
      // });

      return 'Success';
    } catch (err) {
      console.error('Error in newUsers:', err);
    }
  }
}
