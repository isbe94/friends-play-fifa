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

    const teamPayload: Partial<Team> = {
      nameTeam: createTeamDto.nameTeam,
      logoTeam: createTeamDto.logoTeam,
      league: league,
    };

    if (createTeamDto.category) {
      const category = await this.categoryRepository.findOneBy({
        idCategory: createTeamDto.category,
      });

      if (!category) {
        throw new BadRequestException('The provided category does not exist');
      }

      teamPayload.category = category;
    }

    const newTeam = this.teamRepository.create(teamPayload);
    return await this.teamRepository.save(newTeam);
  }

  async findAll() {
    return await this.teamRepository.find();
  }

  async findOne(id: number) {
    return await this.teamRepository.findOneBy({ idTeam: id });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const teamToUpdate = await this.teamRepository.findOneBy({ idTeam: id });
    if (!teamToUpdate) {
      throw new BadRequestException('Team not found');
    }

    if (updateTeamDto.league) {
      const league = await this.leagueRepository.findOneBy({
        idLeague: updateTeamDto.league,
      });
      if (!league) {
        throw new BadRequestException('League not found');
      }
      teamToUpdate.league = league;
    }

    if (updateTeamDto.hasOwnProperty('category')) {
      if (updateTeamDto.category === null) {
        teamToUpdate.category = null;
      } else {
        const category = await this.categoryRepository.findOneBy({
          idCategory: updateTeamDto.category,
        });
        if (!category) {
          throw new BadRequestException('Category not found');
        }
        teamToUpdate.category = category;
      }
    }
    if (updateTeamDto.nameTeam) teamToUpdate.nameTeam = updateTeamDto.nameTeam;
    if (updateTeamDto.logoTeam) teamToUpdate.logoTeam = updateTeamDto.logoTeam;

    // 5. Guardamos la entidad 'teamToUpdate' ya modificada.
    return this.teamRepository.save(teamToUpdate);
  }

  async remove(id: number) {
    return await this.teamRepository.softDelete(id);
  }
}
