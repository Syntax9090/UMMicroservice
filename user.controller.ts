// user.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return await this.userRepository.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.userRepository.delete(id);
  }

  @Get('search')
  async search(@Query('username') username?: string, @Query('minAge') minAge?: number, @Query('maxAge') max