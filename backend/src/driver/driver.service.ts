import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { DriverRepository } from './driver.repository';
import { Driver } from './entities/driver.entity';
import { CreateDriverInput, UpdateDriverInput } from './inputs/driver.input';

import { FindOneOptions } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { State } from './inputs/status.enum';
import { CurrentUser } from '../modules/decorators/user.decorator';
@Injectable()
export class DriverService {
  constructor(private readonly driverRepository: DriverRepository) {}

  getMany(qs?: RepoQuery<Driver>, query?: string) {
    return this.driverRepository.getMany(qs || {}, query);
  }

  getOne(qs: OneRepoQuery<Driver>, query?: string) {
    if (query) {
      return this.driverRepository.getOne(qs, query);
    } else {
      return this.driverRepository.findOne(qs as FindOneOptions<Driver>);
    }
  }

  create(input: CreateDriverInput, currentUser: User): Promise<Driver> {
    const driver = new Driver();
    Object.assign(driver, input);
    driver.user= currentUser;
    return this.driverRepository.save(driver);
  }

  createMany(input: CreateDriverInput[]): Promise<Driver[]> {
    return this.driverRepository.save(input);
  }

  async update(id: number, input: UpdateDriverInput): Promise<Driver> {
    const driver = await this.driverRepository.findOne({ where: { id } });
    return this.driverRepository.save({ ...driver, ...input });
  }

  async delete(id: number) {
    const driver = this.driverRepository.findOne({ where: { id } });
    await this.driverRepository.delete({ id });
    return driver;
  }

  async acceptDustbin(currentUser:User) {
    const driver = await this.driverRepository.findOne({ where: { user: {id: currentUser.id} } });
    if(!driver){
      return {status:'no driver profile found'}
    }
    driver.state = State.busy;
    return this.driverRepository.save(driver);
  }
}
