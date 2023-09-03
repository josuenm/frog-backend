import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../users/services/user.service';
import { RegisterDTO } from '../users/types/RegisterDTO';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req) {
    const payload = { sub: req.user.id, email: req.user.email };

    return {
      token: this.jwtService.sign(payload),
      ...req.user,
    };
  }

  @Post('register')
  async register(@Body(new ValidationPipe()) data: RegisterDTO) {
    const user = await this.userService.create(data);

    const payload = { sub: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
      ...user,
    };
  }
}
