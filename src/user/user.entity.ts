import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('user')
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  apiKey: string;

  @Column()
  macAddress: string;

  @Column()
  userId: number;
}
