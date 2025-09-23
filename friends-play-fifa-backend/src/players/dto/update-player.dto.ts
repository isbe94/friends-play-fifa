import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  // PartialType hace que todas las propiedades de CreatePlayerDto sean opcionales
}
