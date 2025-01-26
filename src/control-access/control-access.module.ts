import { Module } from '@nestjs/common';
import { ControlAccessController } from './control-access.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ControlAccessController],
  imports: [TypeOrmModule],
})
export class ControlAccessModule {}
