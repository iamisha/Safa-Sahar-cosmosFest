import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field(() => String)
  @IsNotEmpty()
  location: string;
}

@InputType()
export class UpdateCustomerInput {
  @Field(() => String)
  @IsNotEmpty()
  location: string;
}
