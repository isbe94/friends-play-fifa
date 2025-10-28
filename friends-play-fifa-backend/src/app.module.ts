import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';
import { LeaguesModule } from './leagues/leagues.module';
import { CategoriesModule } from './categories/categories.module';
import { MatchesModule } from './matches/matches.module';
import { MatchesPlayersModule } from './matches-players/matches-players.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { TournamentsCategoriesModule } from './tournaments-categories/tournaments-categories.module';

@Module({
  imports: [
    // Variables de entorno estén disponibles en toda la aplicación.
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // ruta física en el servidor
      serveRoot: '/uploads', // prefijo URL público
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
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
})
export class AppModule {}
