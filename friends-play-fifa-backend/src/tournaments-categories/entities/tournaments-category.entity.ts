import { Tournament } from 'src/tournaments/entities/tournament.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TournamentCategory {
  @PrimaryGeneratedColumn()
  idTournamentCategory: number;

  @Column({ unique: true })
  nameTournamentCategory: string;

  @OneToMany(() => Tournament, (tournament) => tournament.tournamentCategory) // Diferentes torneos pueden tener la misma categoría
  tournaments: Tournament[];

  @DeleteDateColumn()
  deleteAt: Date;
}
