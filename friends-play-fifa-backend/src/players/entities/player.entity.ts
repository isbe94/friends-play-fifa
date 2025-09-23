import { MatchPlayer } from 'src/matches-players/entities/matches-player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  idPlayer: number;

  @Column({ unique: true })
  namePlayer: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image: string;

  @ManyToOne(() => Team, (team) => team.idTeam, {
    eager: true, // Carga automáticamente la relación con propiedades de la relación
  })
  favoriteTeam: Team;

  @OneToMany(() => Tournament, (tournament) => tournament.winnerTournament)
  tournamentsWon: Tournament[];

  @OneToMany(() => Tournament, (tournament) => tournament.loserTournament)
  tournamentsLost: Tournament[];

  @OneToMany(() => MatchPlayer, (matchPlayer) => matchPlayer.player)
  matchesPlayers: MatchPlayer[];

  @Column({ default: false })
  statusPlayer: boolean;

  @DeleteDateColumn() // Para no eliminar físicamente el registro
  deleteAt: Date;
}
