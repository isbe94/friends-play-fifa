import { match } from 'assert';
import { Match } from 'src/matches/entities/match.entity';
import { Player } from 'src/players/entities/player.entity';
import { TournamentCategory } from 'src/tournaments-categories/entities/tournaments-category.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn()
  idTournament: number;

  @ManyToOne(
    () => TournamentCategory,
    (tournamentCategory) => tournamentCategory.tournaments,
    { eager: true },
  )
  tournamentCategory: TournamentCategory;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateStartTournament: Date;

  @Column({ type: 'timestamp',  nullable: true })
  dateEndTournament: Date;

  @ManyToOne(() => Player, (player) => player.idPlayer, { eager: true, nullable: true})
  winnerTournament: Player | null;

  @ManyToOne(() => Player, (player) => player.idPlayer, { eager: true, nullable: true })
  loserTournament: Player | null;

  @OneToMany(() => Match, (match) => match.tournament)
  matches: Match[];

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageTournament: string;

  @Column({ default: true})
  statusTournament: boolean;

  @DeleteDateColumn()
  deleteAt: Date;
}
