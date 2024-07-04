import { 
  Injectable, 
  ConflictException, 
  InternalServerErrorException, 
  NotFoundException, 
  UnauthorizedException, 
  BadRequestException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {}

  async signup({ email, password }) {
    if(!email || !password) throw new BadRequestException('email or password is missing!');
    const user = await this.userModel.findOne({ email });
    if (user) throw new ConflictException('Email already exist!');
    
    try {
      // TODO: Encrypt the password before storing it to DB
      await this.userModel.create({ email, password });
      return `User created successfully!`;
    } catch (err) {
      console.error('Error in signup:', err);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async login({ email, password }) {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('User not found!');
    if (password !== user.password) throw new UnauthorizedException('Password is incorrect!');

    return `LogIn Successful!`;
  }
}
