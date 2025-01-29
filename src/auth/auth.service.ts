import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './Dto/auth.Dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/Database/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly database: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
    const { email, password } = body;
    const user = await this.database.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const tokenPayload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(tokenPayload);
    return {
      message: 'Login Succeddfull',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async register(body: RegisterDto) {
    const { email, password, name } = body;
    const existingUser = await this.database.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    return await this.database.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }
}

/***
 * 
 * const todoData: TodoDto[] = [
  {
    title: 'Complete NestJS tutorial',
    description: 'Finish the NestJS tutorial on JWT authentication and guards.',
    status: 'in-progress',
  },
  {
    title: 'Fix bug in React app',
    description: 'Resolve the issue with form validation in the login component.',
    status: 'pending',
  },
  {
    title: 'Write documentation for API',
    status: 'completed',
  },
  {
    title: 'Set up Redis cache',
    description: 'Implement Redis caching for API responses to improve performance.',
    status: 'in-progress',
  },
  {
    title: 'Deploy app to production',
    status: 'pending',
  },
];
 */
