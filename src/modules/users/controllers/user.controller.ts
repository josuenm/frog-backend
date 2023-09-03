import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  @Get('getOne')
  getOne(@Req() req) {
    return req.user;
  }
}
