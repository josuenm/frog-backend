import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { User } from 'src/modules/users/entities/User.entity';

@Injectable()
export class AuthService {
  validateUser(user: User, password: string) {
    return compareSync(password, user.password);
  }
}
