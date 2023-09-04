import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from 'src/@types/AuthRequest';
import { RegisterDTO } from '../users/types/RegisterDTO';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: AuthRequest) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(new ValidationPipe()) data: RegisterDTO) {
    return await this.authService.register(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req: AuthRequest) {
    return await this.authService.refreshToken(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: AuthRequest) {
    return await this.authService.logout(req.user);
  }
}
