import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { TournamentCategory } from 'src/tournaments-categories/entities/tournaments-category.entity';
import { Player } from 'src/players/entities/player.entity';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,

    @InjectRepository(TournamentCategory)
    private readonly tournamentCategoryRepository: Repository<TournamentCategory>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto) {
    const tournamentCategory =
      await this.tournamentCategoryRepository.findOneBy({
        idTournamentCategory: createTournamentDto.tournamentCategory,
      });

    if (!tournamentCategory) {
      return { message: 'The tournament category does not exist' };
    }

    const newTournament = new Tournament();

    newTournament.tournamentCategory = tournamentCategory;
    if (createTournamentDto.dateStartTournament) {
      newTournament.dateStartTournament = new Date(
        createTournamentDto.dateStartTournament,
      );
    }
    newTournament.statusTournament = true;

    return this.tournamentRepository.save(newTournament);
  }

  async findAll() {
    return await this.tournamentRepository.find();
  }

  async findOne(id: number) {
    return await this.tournamentRepository.findOneBy({ idTournament: id });
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return;
  }

  async remove(id: number) {
    return await this.tournamentRepository.softDelete(id);
  }
}
