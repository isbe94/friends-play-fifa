import { Injectable } from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeaguesService {
  constructor(
    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,
  ) {}

  async create(createLeagueDto: CreateLeagueDto) {
    return await this.leagueRepository.save(createLeagueDto);
  }

  async findAll() {
    return await this.leagueRepository.find();
  }

  async findOne(id: number) {
    return await this.leagueRepository.findOneBy({ idLeague: id});
  }

  async update(id: number, updateLeagueDto: UpdateLeagueDto) {
    return this.leagueRepository.update(id, updateLeagueDto);
  }

  async remove(id: number) {
    return this.leagueRepository.softDelete(id);
  }
}
