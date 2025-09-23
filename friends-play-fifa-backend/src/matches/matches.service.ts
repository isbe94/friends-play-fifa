import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Player } from 'src/players/entities/player.entity';
import { CreateMatchesPlayerDto } from 'src/matches-players/dto/create-matches-player.dto';
import { MatchPlayer } from 'src/matches-players/entities/matches-player.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,

    @InjectRepository(MatchPlayer)
    private readonly matchPlayerRepository: Repository<MatchPlayer>,
  ) {}

  async create(createMatchDto: CreateMatchDto) {
    const tournament = await this.tournamentRepository.findOneBy({
      idTournament: createMatchDto.tournament,
    });
    if (!tournament) throw new NotFoundException('Match not found');

    const match = this.matchRepository.create({
      tournament: tournament,
      dateMatch: new Date(createMatchDto.dateMatch),
    });

    return this.matchRepository.save(match);
  }

  async findAll() {
    return await this.matchRepository.find();
  }

  async findOne(id: number) {
    return await this.matchRepository.findOneBy({ idMatch: id });
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    return;
  }

  async remove(id: number) {
    return await this.matchRepository.softDelete(id);
  }
}
