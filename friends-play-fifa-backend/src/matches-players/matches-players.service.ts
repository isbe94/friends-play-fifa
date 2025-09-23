import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMatchesPlayerDto } from './dto/create-matches-player.dto';
import { UpdateMatchesPlayerDto } from './dto/update-matches-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/matches/entities/match.entity';
import { Player } from 'src/players/entities/player.entity';
import { MatchPlayer } from './entities/matches-player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchesPlayersService {
  constructor(
    @InjectRepository(MatchPlayer)
    private readonly matchPlayerRepository: Repository<MatchPlayer>,

    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async addPlayersToMatch(createMatchesPlayerDto: CreateMatchesPlayerDto) {
    const match = await this.matchRepository.findOneBy({
      idMatch: createMatchesPlayerDto.match,
    });
    if (!match) throw new BadRequestException('Match not found');

    const player = await this.playerRepository.findOneBy({
      idPlayer: createMatchesPlayerDto.player,
    });
    if (!player) throw new BadRequestException('Player not found');

    const team = await this.teamRepository.findOneBy({
      idTeam: createMatchesPlayerDto.team,
    });
    if (!team) throw new BadRequestException('Team not found');

    const matchPlayer = this.matchPlayerRepository.create({
      match: match,
      player: player,
      team: team,
      goals: createMatchesPlayerDto.goals,
      penalties: createMatchesPlayerDto.penalties,
      isWinner: createMatchesPlayerDto.isWinner,
    });
    return this.matchPlayerRepository.save(matchPlayer);
  }

  async findAll() {
    return await this.matchPlayerRepository.find();
  }

  async findOne(id: number) {
    return await this.matchPlayerRepository.findOneBy({ idMatchPlayer: id });
  }

  async update(id: number, updateMatchesPlayerDto: UpdateMatchesPlayerDto) {
    // return `This action updates a #${id} matchesPlayer`;
    return;
  }

  async remove(id: number) {
    return await this.matchPlayerRepository.softDelete(id);
  }
}
