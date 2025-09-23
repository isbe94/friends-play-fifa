import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { TournamentCategory } from 'src/tournaments-categories/entities/tournaments-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, TournamentCategory])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
  exports: [TypeOrmModule],
})
export class TournamentsModule {}
