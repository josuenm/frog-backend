import { Module } from '@nestjs/common';
import { AccessController } from './controllers/access.controller';
import { AccessService } from './services/access.service';

@Module({
  imports: [],
  controllers: [AccessController],
  providers: [AccessService],
})
export class UsersModule {}
