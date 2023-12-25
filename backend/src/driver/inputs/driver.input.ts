import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { State } from './status.enum';

@InputType()
export class CreateDriverInput {
  @Field(() => String)
  @IsNotEmpty()
  longitude: string;

  @Field(() => String)
  @IsNotEmpty()
  latitude: string;
}

@InputType()
export class UpdateDriverInput {
  @Field(() => String)
  @IsOptional()
  longitude: string;

  @Field(() => String)
  @IsOptional()
  latitude: string;

  @Field(() => State)
  @IsOptional()
  state: State;

}
