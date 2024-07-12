// user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly cacheService: CacheService,
  ) {}

  async findAll(): Promise<User[]> {
    const cachedUsers = await this.cacheService.get('users');
    if (cachedUsers) return cachedUsers;

    const users = await this.userModel.find().exec();
    await this.cacheService.set('users', users, 3600); // cache for 1 hour
    return users;
  }

  async findOne(id: string): Promise<User> {
    const cachedUser = await this.cacheService.get(`user:${id}`);
    if (cachedUser) return cachedUser;

    const user = await this.userModel.findById(id).exec();
    await this.cacheService.set(`user:${id}`, user, 3600); // cache for 1 hour
    return user;
  }

  async create(user: User): Promise<User> {
    const newUser = await this.userModel.create(user);
    await this.cacheService.delete('users');
    return newUser;
  }

  async update(id: string, user: User): Promise<User> {
    await this.userModel.findByIdAndUpdate(id, user).exec();
    await this.cacheService.delete(`user:${id}`);
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndRemove(id).exec();
    await this.cacheService.delete(`user:${id}`);
    await this.cacheService.delete('users');
  }
}