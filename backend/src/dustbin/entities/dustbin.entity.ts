import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Status } from '../inputs/status.enum';

@ObjectType()
@Entity()
export class Dustbin {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String)
  @Column()
  latitude: string;

  @Field(() => String)
  @Column()
  longitude: string;

  @Field(()=>Status)
  @Column({ type: 'enum', enum: Status, default: Status.empty })
  status: Status;

  @Field()
  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date;
}

@ObjectType()
export class GetDustbinType {
  @Field(() => [Dustbin], { nullable: true })
  data?: Dustbin[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
