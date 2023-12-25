import { Injectable } from '@nestjs/common';
import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { DustbinRepository } from './dustbin.repository';
import { Dustbin } from './entities/dustbin.entity';
import { CreateDustbinInput, UpdateDustbinInput } from './inputs/dustbin.input';

import { FindOneOptions } from 'typeorm';
@Injectable()
export class DustbinService {
  constructor(private readonly dustbinRepository: DustbinRepository) {}

  getMany(qs?: RepoQuery<Dustbin>, query?: string) {
    return this.dustbinRepository.getMany(qs || {}, query);
  }

  getOne(qs: OneRepoQuery<Dustbin>, query?: string) {
    if (query) {
      return this.dustbinRepository.getOne(qs, query);
    } else {
      return this.dustbinRepository.findOne(qs as FindOneOptions<Dustbin>);
    }
  }

  create(input: CreateDustbinInput): Promise<Dustbin> {
    const dustbin = new Dustbin();
    Object.assign(dustbin, input);
    return this.dustbinRepository.save(dustbin);
  }

  createMany(input: CreateDustbinInput[]): Promise<Dustbin[]> {
    return this.dustbinRepository.save(input);
  }

  async update(id: number, input: UpdateDustbinInput): Promise<Dustbin> {
    const dustbin = await this.dustbinRepository.findOne({ where: { id } });
    return this.dustbinRepository.save({ ...dustbin, ...input });
  }

  async delete(id: number) {
    const dustbin = this.dustbinRepository.findOne({ where: { id } });
    await this.dustbinRepository.delete({ id });
    return dustbin;
  }
}
