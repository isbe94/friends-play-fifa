import { Module } from '@nestjs/common';
import { MatchesPlayersService } from './matches-players.service';
import { MatchesPlayersController } from './matches-players.controller';
import { MatchPlayer } from './entities/matches-player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Player } from 'src/players/entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/matches/entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatchPlayer, Match, Team, Player])],
  controllers: [MatchesPlayersController],
  providers: [MatchesPlayersService],
  exports: [TypeOrmModule],
})
export class MatchesPlayersModule {}
