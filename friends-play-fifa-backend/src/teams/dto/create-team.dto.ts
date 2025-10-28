import { IsInt, IsNotEmpty, IsPositive, IsString, IsOptional } from 'class-validator';

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

  @IsOptional()
  @IsInt()
  @IsPositive()
  category: number;
}
