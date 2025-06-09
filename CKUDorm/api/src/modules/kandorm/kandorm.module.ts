import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kandorm } from '../../entities/kandorm.entity';
import { KandormController } from './kandorm.controller';
import { KandormService } from './kandorm.service';

@Module({
  imports: [TypeOrmModule.forFeature([Kandorm])],
  controllers: [KandormController],
  providers: [KandormService],
  exports: [KandormService],
})
export class KandormModule {} 