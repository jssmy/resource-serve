import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SuccessHandle } from '@commons/classes/success.handle';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.state=1')
      .skip(skip)
      .take(limit)
      .select([
        'user.id',
        'user.state',
        'user.email',
        'user.name',
        'user.surnames',
        'user.avatars',
        'role.id',
        'role.name',
        'user.protected',
        'user.accountValidated',
      ])
      .getManyAndCount();

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      limit,
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        name: true,
        surnames: true,
        id: true,
        avatars: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async findWriter(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        name: true,
        surnames: true,
        id: true,
        avatars: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async delete(id: string) {
    await this.userRepository.delete(id);

    return new SuccessHandle('Usuario eliminado exitosamente');
  }

  private handleDBException(error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const [, email] = error.sqlMessage.split("'");
      throw new BadRequestException(`El email ${email} ya existe`);
    }

    throw new InternalServerErrorException(error.sqlMessage);
  }
}
