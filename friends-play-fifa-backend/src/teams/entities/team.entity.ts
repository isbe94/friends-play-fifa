import { Category } from 'src/categories/entities/category.entity';
import { League } from 'src/leagues/entities/league.entity';
import { MatchPlayer } from 'src/matches-players/entities/matches-player.entity';
import { Player } from 'src/players/entities/player.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  idTeam: number;

  @Column()
  nameTeam: string;

  @Column({ type: 'varchar', length: 255 })
  logoTeam: string;

  @OneToMany(() => Player, (player) => player.favoriteTeam) // Diferentes jugadores pueden tener el mismo equipo favorito
  players: Player[];

  @ManyToOne(() => League, (league) => league.idLeague, {
    eager: true,
  })
  league: League;

  @ManyToOne(() => Category, (category) => category.teams, {
    eager: true,
    nullable: true, // Permite que sea opcional
  })
  category: Category | null;

  @OneToMany(() => MatchPlayer, (matchesPlayers) => matchesPlayers.team)
  matchesPlayers: MatchPlayer[];

  @DeleteDateColumn()
  deleteAt: Date;
}
