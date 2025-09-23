import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatchesPlayersService } from './matches-players.service';
import { CreateMatchesPlayerDto } from './dto/create-matches-player.dto';
import { UpdateMatchesPlayerDto } from './dto/update-matches-player.dto';

@Controller('matches-players')
export class MatchesPlayersController {
  constructor(private readonly matchesPlayersService: MatchesPlayersService) {}

  @Post()
  create(@Body() createMatchesPlayerDto: CreateMatchesPlayerDto) {
    return this.matchesPlayersService.addPlayersToMatch(createMatchesPlayerDto);
  }

  @Get()
  findAll() {
    return this.matchesPlayersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.matchesPlayersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMatchesPlayerDto: UpdateMatchesPlayerDto) {
    return this.matchesPlayersService.update(+id, updateMatchesPlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.matchesPlayersService.remove(+id);
  }
}
