import { Person } from 'src/person/person.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('contactmanager_groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  owner: number;

  @Column({ type: 'varchar', width: 80 })
  name: string;

  @Column({ type: 'varchar', width: 25 })
  type: string;

  @OneToMany(() => Person, (person) => person.group)
  people: Person[];
}
