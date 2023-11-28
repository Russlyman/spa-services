import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'mongodb')
    private userRepository: Repository<User>,
  ) {}

  async findByMacAddress(macAddress: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { macAddress } });
  }
}
