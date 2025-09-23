import { PartialType } from '@nestjs/mapped-types';
import { CreateMatchesPlayerDto } from './create-matches-player.dto';

export class UpdateMatchesPlayerDto extends PartialType(CreateMatchesPlayerDto) {}
