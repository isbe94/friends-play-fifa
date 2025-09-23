import { Match } from 'src/matches/entities/match.entity';
import { Player } from 'src/players/entities/player.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MatchPlayer {
  @PrimaryGeneratedColumn()
  idMatchPlayer: number;

  @ManyToOne(() => Match, (match) => match.matchesPlayers)
  match: Match;

  @ManyToOne(() => Player, (player) => player.matchesPlayers, { eager: true })
  player: Player;

  @ManyToOne(() => Team, (team) => team.matchesPlayers, { eager: true })
  team: Team;

  @Column({ default: 0 })
  goals: number;

  @Column({ default: 0 })
  penalties: number;

  @Column({ default: false })
  isWinner: boolean;
}
