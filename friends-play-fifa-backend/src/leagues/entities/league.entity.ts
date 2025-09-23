import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class League {
  @PrimaryGeneratedColumn()
  idLeague: number;

  @Column({ unique: true })
  nameLeague: string;

  @Column({ type: 'varchar', length: 255 })
  logoLeague: string;

  @OneToMany(() => Team, (team) => team.league) // Varios equipos pueden estar en una misma liga
  teams: Team[];

  @DeleteDateColumn() // Para no eliminar físicamente el registro
  deleteAt: Date;
}
