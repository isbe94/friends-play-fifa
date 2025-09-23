import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateLeagueDto {
  @IsNotEmpty({ message: 'El nombre de la liga es obligatorio' })
  @IsString()
  nameLeague: string;

  @IsString()
  logoLeague: string;

}
