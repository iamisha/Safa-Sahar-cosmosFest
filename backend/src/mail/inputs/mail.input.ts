import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMailInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  text_content: string;

  @Field({ nullable: true })
  html_content: string;

  @Field()
  @IsNotEmpty()
  subject: string;
}

@InputType()
export class UpdateMailInput {
  @Field(() => String)
  @IsOptional()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  text_content: string;

  @Field({ nullable: true })
  @IsOptional()
  html_content: string;

  @IsNotEmpty()
  @Field({ nullable: true })
  subject: string;
}
