import { Injectable } from '@nestjs/common';
import { CreateTournamentsCategoryDto } from './dto/create-tournaments-category.dto';
import { UpdateTournamentsCategoryDto } from './dto/update-tournaments-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentCategory } from './entities/tournaments-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentsCategoriesService {
  constructor(
    @InjectRepository(TournamentCategory)
    private readonly categoryRepository: Repository<TournamentCategory>,
  ) {}
  async create(createTournamentsCategoryDto: CreateTournamentsCategoryDto) {
    return await this.categoryRepository.save(createTournamentsCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ idTournamentCategory: id});
  }

  async update(
    id: number,
    updateTournamentsCategoryDto: UpdateTournamentsCategoryDto,
  ) {
    return await this.categoryRepository.update(id, updateTournamentsCategoryDto);
  }

  async remove(id: number) {
    return await this.categoryRepository.softDelete(id);
  }
}
