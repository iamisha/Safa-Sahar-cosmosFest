import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsOptional()
  @MinLength(10, { message: 'Phone number should be atleast 10 digits long' })
  @MaxLength(10, { message: 'Phone number cannot be more than 10 digits long' })
  phone?: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(10, { message: 'Password should be atleast 10 digits long' })
  password: string;

  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(255, {
    message: 'Username number should be atmost 255 characters long',
  })
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  phone?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  password?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  username?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  email?: string;
}

@InputType()
export class UpdateUserInputAdmin extends UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  role?: 'admin' | 'user';
}

@InputType()
export class UpdateVerificationInput {
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  email_verified?: boolean;
}

@InputType()
export class UserIdInput {
  @Field(() => String)
  @IsNotEmpty()
  id: string;
}
