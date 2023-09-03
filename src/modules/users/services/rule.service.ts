// roles.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Rule } from '../entities/rule.entity';

@Injectable()
export class RuleInitializer implements OnModuleInit {
  constructor(
    @InjectRepository(Rule) private readonly ruleRepository: Repository<Rule>,
  ) {}

  async onModuleInit() {
    const existingRoles = await this.ruleRepository.find();

    if (existingRoles.length === 0) {
      const rolesToCreate = ['admin', 'user'];

      for (const roleName of rolesToCreate) {
        const role = new Rule();
        role.name = roleName;
        await this.ruleRepository.save(role);
      }
    }
  }
}

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(Rule) private readonly ruleRepository: Repository<Rule>,
  ) {}

  public async findOne(where: FindOptionsWhere<Rule>): Promise<Rule> {
    return this.ruleRepository.findOne({ where });
  }
}
