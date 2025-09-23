import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeamsModule } from './teams/teams.module';
import { LeaguesModule } from './leagues/leagues.module';
import { CategoriesModule } from './categories/categories.module';
import { MatchesModule } from './matches/matches.module';
import { MatchesPlayersModule } from './matches-players/matches-players.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { TournamentsCategoriesModule } from './tournaments-categories/tournaments-categories.module';

@Module({
  imports: [
    PlayersModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "isbelita",
      password: "123456",
      database: "friends_play_fifa",
      autoLoadEntities: true, // Carga automáticamente entidades
      synchronize: true,
    }),
    PlayersModule,
    TeamsModule,
    LeaguesModule,
    CategoriesModule,
    MatchesModule,
    MatchesPlayersModule,
    TournamentsModule,
    TournamentsCategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
