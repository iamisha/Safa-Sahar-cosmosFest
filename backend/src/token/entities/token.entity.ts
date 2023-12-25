import { ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@ObjectType()
@Entity()
export class TokenBlacklist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  tokenIdentifier: string;
}
