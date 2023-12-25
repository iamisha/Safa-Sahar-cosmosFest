import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DustbinService } from './dustbin.service';
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { CurrentQuery } from 'src/modules/decorators/query.decorator';
import { GetDustbinType, Dustbin } from './entities/dustbin.entity';
import { CreateDustbinInput, UpdateDustbinInput } from './inputs/dustbin.input';
@Resolver()
export class DustbinResolver {
  constructor(private readonly dustbinService: DustbinService) {}

  @Query(() => GetDustbinType)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getManyDustbins(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Dustbin>,
    @CurrentQuery() query: string,
  ) {
    return this.dustbinService.getMany(qs, query);
  }

  @Query(() => Dustbin)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getOneDustbin(
    @Args({ name: 'input' })
    qs: GetOneInput<Dustbin>,
    @CurrentQuery() query: string,
  ) {
    return this.dustbinService.getOne(qs, query);
  }

  @Mutation(() => Dustbin)
  // @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createDustbin(@Args('input') input: CreateDustbinInput) {
    return this.dustbinService.create(input);
  }

  @Mutation(() => [Dustbin])
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createManyDustbin(
    @Args({ name: 'input', type: () => [CreateDustbinInput] })
    input: CreateDustbinInput[],
  ) {
    return this.dustbinService.createMany(input);
  }

  @Mutation(() => Dustbin)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  updateDustbin(
    @Args('id') id: number,
    @Args('input') input: UpdateDustbinInput,
  ) {
    return this.dustbinService.update(id, input);
  }

  @Mutation(() => Dustbin)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  deleteDustbin(@Args('id') id: number) {
    return this.dustbinService.delete(id);
  }
}
