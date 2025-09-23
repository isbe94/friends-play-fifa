import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentsCategoryDto } from './create-tournaments-category.dto';

export class UpdateTournamentsCategoryDto extends PartialType(CreateTournamentsCategoryDto) {}
