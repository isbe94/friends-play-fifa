import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class CreateMatchesPlayerDto {
  @IsNotEmpty()
  @IsInt()
  match: number; 

  @IsNotEmpty()
  @IsInt()
  player: number; 

  @IsNotEmpty()
  @IsInt()
  team: number;

  @IsNotEmpty()
  @IsInt()
  goals: number; 

  @IsNotEmpty()
  @IsInt()
  penalties: number; 

  @IsNotEmpty()
  @IsBoolean()
  isWinner: boolean;
}
