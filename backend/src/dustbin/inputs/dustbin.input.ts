import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Status } from './status.enum';

@InputType()
export class CreateDustbinInput {
  @Field(() => String)
  @IsNotEmpty()
  latitude: string;

  @Field(() => String)
  @IsNotEmpty()
  longitude: string;

  @Field(()=>Status)
  @IsNotEmpty()
  status: Status;
}

@InputType()
export class UpdateDustbinInput {
  @Field(() => String)
  @IsOptional()
  latitude: string;

  @Field(() => String)
  @IsOptional()
  longitude: string;

  @Field(()=>Status)
  @IsOptional()
  status: Status;
}

