import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DriverService } from './driver.service';
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { CurrentQuery } from 'src/modules/decorators/query.decorator';
import { GetDriverType, Driver } from './entities/driver.entity';
import { CreateDriverInput, UpdateDriverInput } from './inputs/driver.input';
@Resolver()
export class DriverResolver {
  constructor(private readonly driverService: DriverService) {}

  @Query(() => GetDriverType)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getManyDrivers(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Driver>,
    @CurrentQuery() query: string,
  ) {
    return this.driverService.getMany(qs, query);
  }

  @Query(() => Driver)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getOneDriver(
    @Args({ name: 'input' })
    qs: GetOneInput<Driver>,
    @CurrentQuery() query: string,
  ) {
    return this.driverService.getOne(qs, query);
  }

  @Mutation(() => Driver)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createDriver(@Args('input') input: CreateDriverInput) {
    return this.driverService.create(input);
  }

  @Mutation(() => [Driver])
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createManyDriver(
    @Args({ name: 'input', type: () => [CreateDriverInput] })
    input: CreateDriverInput[],
  ) {
    return this.driverService.createMany(input);
  }

  @Mutation(() => Driver)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  updateDriver(
    @Args('id') id: number,
    @Args('input') input: UpdateDriverInput,
  ) {
    return this.driverService.update(id, input);
  }

  @Mutation(() => Driver)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  deleteDriver(@Args('id') id: number) {
    return this.driverService.delete(id);
  }
}
