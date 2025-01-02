// src/users/domain/users.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../app/dtos/create-user.dto';
import { User } from '../infra/user.entity';  // Import the User entity
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';  // Use TypeORM's Repository

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)  // Inject the User repository for TypeORM
    private userRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { username, password } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = this.userRepository.create({ username, password: hashedPassword });
    const savedUser = await this.userRepository.save(user);

    // Omit password from the returned result
    const { password: _, ...result } = savedUser;
    return result;
  }

  // Find a user by username
  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  // Find a user by ID
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}
