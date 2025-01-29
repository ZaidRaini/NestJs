import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './Dto/auth.Dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginUser(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  registerUser(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
