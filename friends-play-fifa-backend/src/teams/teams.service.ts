import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { League } from 'src/leagues/entities/league.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const league = await this.leagueRepository.findOneBy({
      idLeague: createTeamDto.league,
    });

    if (!league) {
      return { message: 'The league does not exist' };
    }

    const category = await this.categoryRepository.findOneBy({
      idCategory: createTeamDto.category,
    });

    if (!category) {
      return { message: 'The category does not exist' };
    }

    return await this.teamRepository.save({
      ...createTeamDto,
      league: league,
      category: category,
    });
  }

  async findAll() {
    return await this.teamRepository.find();
  }

  async findOne(id: number) {
    return await this.teamRepository.findOneBy({ idTeam: id });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const team = await this.teamRepository.findOneBy({ idTeam: id });
    if (!team) {
      throw new BadRequestException('Team not found');
    }

    let league: League | null = null;
    if (updateTeamDto.league) {
      league = await this.leagueRepository.findOneBy({
        idLeague: updateTeamDto.league,
      });
    }

    if (!league && updateTeamDto.league) {
      throw new BadRequestException('League not found');
    }
    let category: Category | null = null;
    if (updateTeamDto.category) {
      category = await this.categoryRepository.findOneBy({
        idCategory: updateTeamDto.category,
      });
    }

    if (!category && updateTeamDto.category) {
      throw new BadRequestException('Category not found');
    }

    return await this.teamRepository.save({
      ...team,
      ...updateTeamDto,
      league: league ?? team.league,
      category: category ?? team.category,
    });
  }

  async remove(id: number) {
    return await this.teamRepository.softDelete(id);
  }
}
