import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm'
import { League } from 'src/leagues/entities/league.entity';
import { Category } from 'src/categories/entities/category.entity';
import { MatchPlayer } from 'src/matches-players/entities/matches-player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, League, Category, MatchPlayer] )], // Hace accesible los repositorios en el servicio TeamsService
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TypeOrmModule],
})
export class TeamsModule {}
