import { GraphqlPassportAuthGuard } from '../modules/guards/graphql-passport-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { GetManyInput, GetOneInput } from 'src/declare/inputs/custom.input';
import { CurrentQuery } from 'src/modules/decorators/query.decorator';
import { GetCustomerType, Customer } from './entities/customer.entity';
import {
  CreateCustomerInput,
  UpdateCustomerInput,
} from './inputs/customer.input';
@Resolver()
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => GetCustomerType)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getManyCustomers(
    @Args({ name: 'input', nullable: true })
    qs: GetManyInput<Customer>,
    @CurrentQuery() query: string,
  ) {
    return this.customerService.getMany(qs, query);
  }

  @Query(() => Customer)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  getOneCustomer(
    @Args({ name: 'input' })
    qs: GetOneInput<Customer>,
    @CurrentQuery() query: string,
  ) {
    return this.customerService.getOne(qs, query);
  }

  @Mutation(() => Customer)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createCustomer(@Args('input') input: CreateCustomerInput) {
    return this.customerService.create(input);
  }

  @Mutation(() => [Customer])
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  createManyCustomer(
    @Args({ name: 'input', type: () => [CreateCustomerInput] })
    input: CreateCustomerInput[],
  ) {
    return this.customerService.createMany(input);
  }

  @Mutation(() => Customer)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  updateCustomer(
    @Args('id') id: number,
    @Args('input') input: UpdateCustomerInput,
  ) {
    return this.customerService.update(id, input);
  }

  @Mutation(() => Customer)
  @UseGuards(new GraphqlPassportAuthGuard('admin'))
  deleteCustomer(@Args('id') id: number) {
    return this.customerService.delete(id);
  }
}
