import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { User } from '@user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ByCript } from '@commons/classes/bycript';
import { GenerateTokenService } from '@token/generate-token.service';

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
      throw new BadRequestException('Credenciales incorrectas');
    }

    if (!user.state) {
      throw new ForbiddenException('Usuario no encontrado');
    }

    const passwordPassedOk = ByCript.compareSync(
      loginDto.password,
      user.password,
    );

    if (!passwordPassedOk) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    if (!user.accountValidated) {
      throw new ForbiddenException('Por favor valida tu cuenta de correco');
    }

    return this.generateToken.token(user);
  }
}
