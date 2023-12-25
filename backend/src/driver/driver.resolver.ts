import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DriverService } from './driver.service';
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { CurrentQuery } from 'src/modules/decorators/query.decorator';
import { GetDriverType, Driver } from './entities/driver.entity';
import { CreateDriverInput, UpdateDriverInput } from './inputs/driver.input';
import { CurrentUser } from 'src/modules/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { DriverRepository } from './driver.repository';
@Resolver()
export class DriverResolver {
  constructor(
    private readonly driverService: DriverService,
    private readonly driverRepository: DriverRepository,
    ) {}

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
  @UseGuards(new GraphqlPassportAuthGuard('user'))
  createDriver(@Args('input') input: CreateDriverInput, @CurrentUser() user:User) {
    return this.driverService.create(input, user);
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
  async updateDriverProfile(
    @CurrentUser() user: User,
    @Args('input') input: UpdateDriverInput,
  ) {
    const driver=await this.driverRepository.findOne({where:{user:{id:user.id}},relations:['user']});
    if(driver.user.id!==user.id) throw new Error('You are not authorized to perform this action');
    return this.driverService.update(user.id, input);
  }



  @Mutation(() => Driver)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  deleteDriver(@Args('id') id: number) {
    return this.driverService.delete(id);
  }
}
