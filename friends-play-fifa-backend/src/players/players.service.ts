import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/teams/entities/team.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>, // Para acceder a todos los métodos del repositorio

    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const team = await this.teamRepository.findOneBy({
      idTeam: createPlayerDto.favoriteTeam,
    });
    if (!team) {
      return { message: 'The team does not exist' };
    }
    //const newPlayer = this.playerRepository.create(createPlayerDto); // Crea una instancia de Player para pasar al save()
    return await this.playerRepository.save({
      ...createPlayerDto,
      favoriteTeam: team,
    });
  }

  async findAll() {
    return await this.playerRepository.find();
  }

  async findOne(id: number) {
    return this.playerRepository.findOneBy({ idPlayer: id });
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    let team: Team | undefined = undefined;

    // Si viene un nuevo equipo favorito en el DTO
    if (updatePlayerDto.favoriteTeam) {
      const foundTeam = await this.teamRepository.findOneBy({
        idTeam: updatePlayerDto.favoriteTeam,
      });

      if (!foundTeam) {
        throw new BadRequestException('Team not found');
      }

      team = foundTeam;
    }

    // Preload crea una entidad combinando lo que hay en DB + DTO
    const player = await this.playerRepository.preload({
      idPlayer: id,
      ...updatePlayerDto,
      favoriteTeam: team,
    });

    if (!player) {
      throw new BadRequestException('Player not found');
    }

    return this.playerRepository.save(player);
  }

  async remove(id: number) {
    return await this.playerRepository.softDelete(id); // Soft delete, no lo elimina físicamente
  }
}
