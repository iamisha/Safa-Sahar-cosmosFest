import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { CustomerRepository } from './customer.repository';
import { Customer } from './entities/customer.entity';
import {
  CreateCustomerInput,
  UpdateCustomerInput,
} from './inputs/customer.input';

import { FindOneOptions } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  getMany(qs?: RepoQuery<Customer>, query?: string) {
    return this.customerRepository.getMany(qs || {}, query);
  }

  getOne(qs: OneRepoQuery<Customer>, query?: string) {
    if (query) {
      return this.customerRepository.getOne(qs, query);
    } else {
      return this.customerRepository.findOne(qs as FindOneOptions<Customer>);
    }
  }

  create(input: CreateCustomerInput, currentUser:User): Promise<Customer> {
    const customer = new Customer();
    Object.assign(customer, input);
    customer.user= currentUser;
    return this.customerRepository.save(customer);
  }

  createMany(input: CreateCustomerInput[]): Promise<Customer[]> {
    return this.customerRepository.save(input);
  }

  async update(id: number, input: UpdateCustomerInput): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    return this.customerRepository.save({ ...customer, ...input });
  }

  async delete(id: number) {
    const customer = this.customerRepository.findOne({ where: { id } });
    await this.customerRepository.delete({ id });
    return customer;
  }
}
