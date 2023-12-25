import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { State } from 'src/driver/inputs/status.enum';
import { Dustbin } from 'src/dustbin/entities/dustbin.entity';

@ObjectType()
@Entity()
export class Driver {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String)
  @Column()
  longitude: string;

  @Field(() => String)
  @Column()
  latitude: string;

  @Field(()=>State)
  @Column('enum', { enum: State, default: State.idle })
  state: State;

  @Field(() => User)
  @OneToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'user_id' }) // 'user_id' should be a string
  user: User;

  @Field(()=>Dustbin)
  @OneToMany(() => Dustbin, (dustbin) => dustbin.driver)
  dustbins: Dustbin[];

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
export class GetDriverType {
  @Field(() => [Driver], { nullable: true })
  data?: Driver[];

  @Field(() => Number, { nullable: true })
  count?: number;
}
