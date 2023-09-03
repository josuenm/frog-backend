import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { Rule } from './entities/Rule.entity';
import { User } from './entities/User.entity';
import { RuleInitializer, RuleService } from './services/rule.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rule])],
  controllers: [UserController],
  providers: [RuleInitializer, UserService, RuleService],
})
export class UsersModule {}
