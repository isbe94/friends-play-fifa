import { Module } from '@nestjs/common';
import { TournamentsCategoriesService } from './tournaments-categories.service';
import { TournamentsCategoriesController } from './tournaments-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentCategory } from './entities/tournaments-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentCategory])],
  controllers: [TournamentsCategoriesController],
  providers: [TournamentsCategoriesService],
  exports: [TypeOrmModule],
})
export class TournamentsCategoriesModule {}
