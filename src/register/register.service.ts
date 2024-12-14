import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserFactory } from 'src/user/factories/user.factory';
import { Repository } from 'typeorm';
import { ConfirmAccountService } from '../confirm-account/confirm-account.service';
import { CreatedHandle } from 'src/commons/classes/created.handle';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly confirmAccountService: ConfirmAccountService,
  ) {}
  async create(createUserDto: RegisterUserDto) {
    try {
      const user = new UserFactory(createUserDto).create();
      await this.userRepository.save(user);
      this.confirmAccountService.sendConfirmation(user).finally();
      return new CreatedHandle('User was created successfully');
    } catch (err) {
      this.handleDBException(err);
    }
  }

  private handleDBException(error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const [, email] = error.sqlMessage.split("'");
      throw new BadRequestException(`Email ${email} is already exist`);
    }

    throw new InternalServerErrorException(error.sqlMessage);
  }
}
