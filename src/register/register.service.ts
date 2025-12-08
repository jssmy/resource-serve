import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { UserFactory } from '@user/factories/user.factory';
import { Repository } from 'typeorm';
import { ConfirmAccountService } from '../confirm-account/confirm-account.service';
import { CreatedHandle } from '@commons/classes/created.handle';
import { RegisterUserDto } from '@user/dto/register-user.dto';
import { Password } from '@commons/utils/password.util';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly confirmAccountService: ConfirmAccountService,
  ) {}
  async create(createUserDto: RegisterUserDto) {
    try {
      const password = new Password().generate();
      // set password for encrypt
      const user = new UserFactory({
        ...createUserDto,
        password,
      }).create();

      await this.userRepository.save(user);

      /// set origin password for send by mail confirmation
      this.confirmAccountService
        .sendConfirmation({
          ...user,
          password,
        })
        .finally();
      return new CreatedHandle('Usuario creado exitosamente');
    } catch (err) {
      this.handleDBException(err);
    }
  }

  private handleDBException(error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const [, email] = error.sqlMessage.split("'");
      throw new BadRequestException(`El email ${email} ya existe`);
    }

    throw new InternalServerErrorException(error.sqlMessage);
  }
}
