import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDriverInput {
  @Field(() => String)
  @IsNotEmpty()
  location: string;
}

@InputType()
export class UpdateDriverInput {
  @Field(() => String)
  @IsOptional()
  location: string;
}
