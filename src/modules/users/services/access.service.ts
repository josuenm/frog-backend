import { Injectable } from '@nestjs/common';
import { LoginDTO } from '../types/LoginDTO';
import { RegisterDTO } from '../types/RegisterDTO';

@Injectable()
export class AccessService {
  public async login(data: LoginDTO) {
    return 'Ok';
  }

  public async register(data: RegisterDTO) {
    return 'Ok';
  }
}
