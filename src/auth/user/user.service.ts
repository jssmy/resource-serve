import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFactory } from './factory/user.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SuccessCreatedHandle } from 'src/commons/classes/success-crated-handle';
import { ByCript } from 'src/commons/classes/bycript';


@Injectable()
export class UserService {
  private readonly log = new Logger();
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    try {
      const user = new UserFactory(createUserDto).create();
      await this.userRepository.save(user);
      return new SuccessCreatedHandle('Account created succesfull. Plese valid your account.');
    } catch (error) {
      this.log.error(error);
      this.handleDBException(error);
    }
    
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  private handleDBException(error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException(error.sqlMessage);
    }

    throw new InternalServerErrorException(error.sqlMessage);
  }
}
