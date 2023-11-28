import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Details } from './details.entity';
import { Group } from 'src/group/group.entity';

@Entity('contactmanager_group_entries')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  groupid: number;

  @Column({ type: 'int' })
  user: number;

  @Column({ type: 'varchar', width: 100 })
  displayname: string;

  @Column({ type: 'varchar', width: 100 })
  fname: string;

  @Column({ type: 'varchar', width: 100 })
  lname: string;

  @Column({ type: 'varchar', width: 100 })
  title: string;

  @Column({ type: 'varchar', width: 100 })
  company: string;

  @Column({ type: 'varchar', width: 200 })
  address: string;

  @Column({
    type: 'varchar',
    width: 36,
    nullable: true,
    unique: true,
    default: null,
  })
  uuid?: string | null;

  @ManyToOne(() => Group, (group) => group.people)
  @JoinColumn({ name: 'groupid', referencedColumnName: 'id' })
  group: Group;

  @OneToMany(() => Details, (details) => details.person)
  details: Details[];
}
