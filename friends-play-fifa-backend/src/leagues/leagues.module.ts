import { forwardRef, Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { TeamsModule } from 'src/teams/teams.module';

@Module({
  imports: [TypeOrmModule.forFeature([League]), forwardRef(() => TeamsModule),],
  controllers: [LeaguesController],
  providers: [LeaguesService],
  exports: [TypeOrmModule, LeaguesService],
})
export class LeaguesModule {}
