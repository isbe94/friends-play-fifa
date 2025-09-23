import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// Info que se necesita para crear un jugador, no tiene que ser igual que la entidad
export class CreatePlayerDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  namePlayer: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
    message:
      'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&). Mínimo 8 caracteres y máximo 20.',
  })
  password: string;

  @IsInt()
  @IsPositive()
  favoriteTeam: number;

  @IsOptional()
  @IsString()
  image?: string;
}
