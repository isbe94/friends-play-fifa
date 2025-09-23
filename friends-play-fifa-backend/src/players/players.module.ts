import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { Player } from './entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Team, Tournament])],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [TypeOrmModule]
})
export class PlayersModule {}
