import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, RegisterDto } from './Dto/user.Dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  createUser(@Body() registerBody: RegisterDto) {
    return this.usersService.createUser(registerBody);
  }

  @Post('login')
  loginUser(@Body() loginBody: LoginDto) {
    return this.usersService.loginUser(loginBody);
  }
}
