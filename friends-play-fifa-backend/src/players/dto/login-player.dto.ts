import { IsNotEmpty, IsString } from 'class-validator';

export class LoginPlayerDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  namePlayer: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString()
  password: string;
}