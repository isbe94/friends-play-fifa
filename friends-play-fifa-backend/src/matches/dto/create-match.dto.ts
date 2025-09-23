import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsInt()
  tournament: number;

  @IsOptional()
  @IsDateString()
  dateMatch: string;
}
