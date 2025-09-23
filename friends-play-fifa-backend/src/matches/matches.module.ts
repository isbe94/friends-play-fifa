import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Match } from './entities/match.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Player } from 'src/players/entities/player.entity';
import { MatchPlayer } from 'src/matches-players/entities/matches-player.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Match, Tournament, Team, Player, MatchPlayer])],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [TypeOrmModule]
})
export class MatchesModule {}
