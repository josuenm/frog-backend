import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { RegisterDTO } from '../types/RegisterDTO';
import { RuleService } from './rule.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly ruleService: RuleService,
  ) {}

  public async findOne(
    where: FindOptionsWhere<User>,
    options?: FindOneOptions<User>,
  ): Promise<User> {
    return this.userRepository.findOne({ where, ...options });
  }

  public async create(data: RegisterDTO): Promise<User> {
    const userExists = await this.findOne({
      username: data.username,
      email: data.email,
    });

    if (userExists) {
      if (userExists.email === data.email) {
        throw new HttpException('Email already exists', 402);
      }
      if (userExists.username === data.username) {
        throw new HttpException('Username already exists', 402);
      }
    }

    const userRule = await this.ruleService.findOne({
      name: 'user',
    });
    const user = await this.userRepository.save(
      this.userRepository.create({ ...data, roles: [userRule] }),
    );

    return user;
  }

  public async update(
    find: FindOptionsWhere<User>,
    update: Partial<User>,
  ): Promise<User> {
    const user = await this.findOne(find);

    Object.assign(user, update);

    return await this.userRepository.save(user);
  }
}
