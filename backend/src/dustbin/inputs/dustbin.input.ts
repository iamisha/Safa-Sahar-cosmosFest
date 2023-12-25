import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDustbinInput {
  @Field(() => String)
  @IsNotEmpty()
  location: string;
}

@InputType()
export class UpdateDustbinInput {
  @Field(() => String)
  @IsOptional()
  location: string;
}
