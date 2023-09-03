import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/modules/users/services/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.userService.findOne({ username });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const userIsValid = this.authService.validateUser(user, password);
    if (!userIsValid) {
      throw new HttpException(
        'Username or password is invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
