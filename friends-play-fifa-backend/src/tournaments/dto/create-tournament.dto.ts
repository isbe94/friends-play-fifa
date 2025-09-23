import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTournamentDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  tournamentCategory: number;

  @IsOptional()
  @IsDateString()
  dateStartTournament: string;

}
