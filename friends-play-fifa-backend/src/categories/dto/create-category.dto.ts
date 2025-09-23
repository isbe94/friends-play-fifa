import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateCategoryDto {
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio' })
  @IsString()
  nameCategory: string;

  @IsNotEmpty({ message: 'El logo de la categoría es obligatorio' })
  @IsString()
  logoCategory: string;
}
