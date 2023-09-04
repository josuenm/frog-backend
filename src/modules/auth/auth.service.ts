import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { User } from 'src/modules/users/entities/User.entity';
import { UserService } from '../users/services/user.service';
import { RegisterDTO } from '../users/types/RegisterDTO';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(user: User, password: string) {
    return compareSync(password, user.password);
  }

  makeAccessToken(sub: number, email: string) {
    return this.jwtService.sign({ sub, email }, { expiresIn: 17 * 60 }); // 15 minutos
  }

  async makeRefreshToken(sub: number, email: string) {
    const refreshToken = this.jwtService.sign(
      { sub, email },
      { expiresIn: 7 * 24 * 60 }, // 7 dias
    );

    const hashedRefreshToken = hashSync(refreshToken, 10);

    await this.userService.update(
      { email },
      { refreshToken: hashedRefreshToken },
    );
    return refreshToken;
  }

  async login(user: User) {
    return {
      ...user,
      token: this.makeAccessToken(user.id, user.email),
      refreshToken: await this.makeRefreshToken(user.id, user.email),
    };
  }

  async register(data: RegisterDTO) {
    return await this.userService.create(data);
  }

  async refreshToken(user: User) {
    const refreshToken = await this.makeRefreshToken(user.id, user.email);

    await this.userService.update(
      { id: user.id },
      {
        refreshToken,
      },
    );

    return {
      token: this.makeAccessToken(user.id, user.email),
      refreshToken,
    };
  }

  async logout(user: User) {
    return await this.userService.update(
      { id: user.id },
      {
        refreshToken: null,
      },
    );
  }
}
