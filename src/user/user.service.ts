import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFactory } from './factory/user.factory';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SuccessCreatedHandle } from 'src/commons/classes/success-crated-handle';
import { MailService } from 'src/mail/mail.service';
import { AccountValidation } from './entities/account-validation.entity';
import { ConfigService } from '@nestjs/config';
import { AccountValidationFactory } from './factory/account-validation.factory';

@Injectable()
export class UserService {
  private readonly log = new Logger();
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(AccountValidation)
    private readonly accounRepository: Repository<AccountValidation>,
    private readonly mail: MailService,
    private readonly config: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new UserFactory(createUserDto).create();
      await this.userRepository.save(user);
      this.accounValidation(user).finally();
      return new SuccessCreatedHandle(
        'Account created succesfull. Plese valid your account.',
      );
    } catch (error) {
      this.log.error(error);
      this.handleDBException(error);
    }
  }

  private async accounValidation(user: User) {
    const accountValidation = new AccountValidationFactory(
      user.id,
      this.config.get('MAIL_CONFIRM_EXPIRES_IN'),
    ).create();

    await this.accounRepository.save(accountValidation);
    this.mail.sendMailAccountConfirmation({
      to: user.email,
      token: accountValidation.token,
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return {
      id,
      updateUserDto,
    };
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
