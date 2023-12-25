import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MailService } from './mail.service';
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { CurrentQuery } from 'src/modules/decorators/query.decorator';
import { GetMailType, Mail } from './entities/mail.entity';
import { CreateMailInput, UpdateMailInput } from './inputs/mail.input';
@Resolver()
export class MailResolver {
  constructor(private readonly mailService: MailService) {}

  @Mutation(() => Mail)
  // @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createMail(@Args('input') input: CreateMailInput) {
    return this.mailService.create(input);
  }

  @Mutation(() => Mail)
  // @UseGuards(new GraphqlPassportAuthGuard('admin'))
  updateMail(@Args('id') id: number, @Args('input') input: UpdateMailInput) {
    return this.mailService.update(id, input);
  }

  @Mutation(() => Mail)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  deleteMail(@Args('id') id: number) {
    return this.mailService.delete(id);
  }
}
