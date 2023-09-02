import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AccessService } from '../services/access.service';
import { LoginDTO } from '../types/LoginDTO';
import { RegisterDTO } from '../types/RegisterDTO';

@Controller('/access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post('/login')
  public async login(
    @Body(new ValidationPipe()) data: LoginDTO,
    @Res() res: Response,
  ): Promise<void> {
    try {
      res.status(200).send(await this.accessService.login(data));
    } catch (e) {
      res
        .status(e.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .send(e.response || 'Something wrong, try again');
    }
  }

  @Post('/register')
  public async register(
    @Body(new ValidationPipe()) data: RegisterDTO,
    @Res() res: Response,
  ): Promise<void> {
    try {
      res.status(200).send(await this.accessService.register(data));
    } catch (e) {
      res
        .status(e.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .send(e.response || 'Something wrong, try again');
    }
  }
}
