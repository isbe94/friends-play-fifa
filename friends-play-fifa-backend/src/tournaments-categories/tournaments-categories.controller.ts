import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TournamentsCategoriesService } from './tournaments-categories.service';
import { CreateTournamentsCategoryDto } from './dto/create-tournaments-category.dto';
import { UpdateTournamentsCategoryDto } from './dto/update-tournaments-category.dto';

@Controller('tournaments-categories')
export class TournamentsCategoriesController {
  constructor(private readonly tournamentsCategoriesService: TournamentsCategoriesService) {}

  @Post()
  create(@Body() createTournamentsCategoryDto: CreateTournamentsCategoryDto) {
    return this.tournamentsCategoriesService.create(createTournamentsCategoryDto);
  }

  @Get()
  findAll() {
    return this.tournamentsCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tournamentsCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTournamentsCategoryDto: UpdateTournamentsCategoryDto) {
    return this.tournamentsCategoriesService.update(+id, updateTournamentsCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tournamentsCategoriesService.remove(+id);
  }
}
