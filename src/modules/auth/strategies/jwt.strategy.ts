import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/@types/JwtPayload';
import { UserService } from 'src/modules/users/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    if (currentTimeInSeconds >= payload.exp) {
      throw new HttpException('Token expired', HttpStatus.UNAUTHORIZED);
    }

    const user = this.userService.findOne(
      { email: payload.email },
      { relations: ['roles'] },
    );
    return user;
  }
}
