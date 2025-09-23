import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  idCategory: number;

  @Column({ unique: true })
  nameCategory: string;

  @Column({ type: 'varchar', length: 255 })
  logoCategory: string;

  @OneToMany(() => Team, (team) => team.category) // Varios equipos se pueden clasificar con la misma categoría
  teams: Team[];

  @DeleteDateColumn()
  deleteAt: Date;
}
