import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './Dto/user.Dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly Prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createData: RegisterDto) {
    const { name, email, username, password } = createData;

    const existingUser = await this.Prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.Prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return { message: 'Register Successfully', Data: user };
  }

  async loginUser(loginData: LoginDto) {
    const { email, password } = loginData;
    const user = await this.Prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync({ id: user.id });

    return {
      message: 'Login Successfull',
      token,
      Data: {
        userId: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      },
    };
  }
}
