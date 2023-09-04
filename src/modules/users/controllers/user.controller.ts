import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from 'src/@types/AuthRequest';

@Controller('v1/users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  @Get('getOne')
  getOne(@Req() req: AuthRequest) {
    return req.user;
  }
}
