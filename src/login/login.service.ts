import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ByCript } from 'src/commons/classes/bycript';
import { GenerateTokenService } from 'src/token/generate-token.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly generateToken: GenerateTokenService,
  ) {}

  async attemp(loginDto: LoginDto) {
    const email = loginDto.email.toLocaleLowerCase();
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        surnames: true,
        password: true,
        state: true,
        accountValidated: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are incorrect');
    }

    if (!user.state) {
      throw new ForbiddenException('User is inactive');
    }

    if (!user.accountValidated) {
      throw new ForbiddenException('Please validate your account');
    }

    const passwordPassedOk = ByCript.compareSync(
      loginDto.password,
      user.password,
    );

    if (!passwordPassedOk) {
      throw new ForbiddenException('Credentials are incorrect');
    }

    return this.generateToken.token(user);
  }
}
