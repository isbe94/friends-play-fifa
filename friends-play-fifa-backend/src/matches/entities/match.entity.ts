import { MatchPlayer } from 'src/matches-players/entities/matches-player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  idMatch: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateMatch: Date;

  @ManyToOne(() => Tournament, (tournament) => tournament.matches, {
    eager: true,
    nullable: true
  })
  tournament?: Tournament; // Indica que puede ser null, para el caso de partidos amistosos

  @OneToMany(() => MatchPlayer, (matchPlayer) => matchPlayer.match, {
    eager: true,
  })
  matchesPlayers: MatchPlayer[];
}
