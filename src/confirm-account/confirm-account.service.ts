import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfirmAccount } from './entities/confirm-account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { ConfirmAccountFactory } from '../register/factories/confirm-account.factory';
import { ConfigService } from '@nestjs/config';
import { DateHelper } from 'src/commons/classes/date-helper';
import { SuccessHandle } from 'src/commons/classes/success.handle';
import { ConfirmAccountDto } from './dto/confirm-account.dto';

@Injectable()
export class ConfirmAccountService {
  constructor(
    @InjectRepository(ConfirmAccount)
    private readonly accountConfirmRepository: Repository<ConfirmAccount>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mainService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async sendConfirmation(user: User) {
    try {


      const accountValidation = new ConfirmAccountFactory(
        user.id,
        this.configService.get('MAIL_CONFIRM_EXPIRES_IN'),
      ).create();
  
      await this.accountConfirmRepository.save(accountValidation);
      this.mainService.sendMailAccountConfirmation(user, accountValidation.token).finally();
    } catch (e){
      
    }
  }

  async confrim(token: string) {

    const accountConfirmation = await this.accountConfirmRepository.findOne({
      where: { token, revoked: false },
      
    });

    if (!accountConfirmation) {
      throw new BadRequestException('Token is invalid');
    }

    const isExpiredToken =
      DateHelper.date(accountConfirmation.expiresIn).diff(
        DateHelper.date(),
        'hours',
      ) <= 0;

    if (isExpiredToken) {
      throw new HttpException('Token expired', 419);
    }

    try {
      await  Promise.all([
        this.accountConfirmRepository.update(accountConfirmation.token, {
          revoked: true,
        }),
        this.userRepository.update(accountConfirmation.userId, {
          accountValidated: true,
          accountValidatedDate: DateHelper.date().toDate(),
        }),
      ]);
      return new SuccessHandle('Account is validated')
    } catch(e) {
      throw new InternalServerErrorException('Error inesperdo');
    }
  }

  async retryConfirmation(confirmDto: ConfirmAccountDto) {
    const email = confirmDto.email.toLocaleLowerCase();

    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    if (user.accountValidated) {
      throw new BadRequestException('Email account is already validated');
    }

    return this.sendConfirmation(user)
      .then(
        () =>
          new SuccessHandle(`Mail was send to ${email}, please yor inbox mail`),
      )
      .catch((err) => {
        throw new HttpException(err, err.status || 500);
      });
  }
}
