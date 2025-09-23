import { IsNotEmpty, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateTournamentsCategoryDto {
  @IsNotEmpty({
    message: 'El nombre de la categoría del torneo es obligatorio',
  })
  @IsString()
  nameTournamentCategory: string;
}
