import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

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
  @IsNotEmpty()
  longitude: string;

  @Field(() => String)
  @IsNotEmpty()
  latitude: string;
}
