import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body() reqBody: SignupDto
  ) {
    return await this.authService.signup(reqBody);
  }

  @Post('/login')
  async login(
    @Body() reqBody: LoginDto
  ) {
    return await this.authService.login(reqBody);
  }
}
