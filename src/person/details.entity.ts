import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Person } from './person.entity';

@Entity('contactmanager_entry_numbers')
export class Details {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  entryid: number;

  @Column({ type: 'varchar', width: 100, nullable: true, default: null })
  number?: string | null;

  @Column({ type: 'varchar', width: 100, nullable: true, default: null })
  extension?: string | null;

  @Column({ type: 'varchar', width: 4, nullable: true, default: null })
  countrycode?: string | null;

  @Column({ type: 'varchar', width: 100, nullable: true, default: null })
  nationalnumber?: string | null;

  @Column({ type: 'varchar', width: 2, nullable: true, default: null })
  regioncode?: string | null;

  @Column({ type: 'varchar', width: 2, nullable: true, default: null })
  locale?: string | null;

  @Column({ type: 'varchar', width: 100, nullable: true, default: null })
  stripped?: string | null;

  @Column({ type: 'varchar', width: 100, nullable: true, default: null })
  type?: string | null;

  @Column({ type: 'varchar', width: 100, nullable: true, default: null })
  flags?: string | null;

  @Column({ type: 'varchar', width: 100, nullable: true, default: null })
  E164?: string | null;

  @Column({ type: 'tinyint', width: 1, nullable: true, default: null })
  possibleshort?: boolean | null;

  @ManyToOne(() => Person, (person) => person.details)
  @JoinColumn({ name: 'entryid', referencedColumnName: 'id' })
  person: Person;
}
