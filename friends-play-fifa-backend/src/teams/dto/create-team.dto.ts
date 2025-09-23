import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  nameTeam: string;

  @IsNotEmpty()
  @IsString()
  logoTeam: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  league: number;

  @IsInt()
  @IsPositive()
  category: number;
}
