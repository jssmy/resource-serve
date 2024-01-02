import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { UserService } from '../user/user.service';
import { ByCript } from 'src/commons/classes/bycript';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './interfaces/jwt-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {

  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      private readonly jwtService: JwtService
    ) {

  }

  async attemp(email: string, password: string) {
    
    const user = await this.userRepository.findOne( 
     {
       where: { email },
       select: {
         email: true,
         password: true
       }
     }
    );

    if (!user) {
     throw new NotFoundException('Credentials are incorrect');
    }

    const isHashedOk = ByCript.compareSync(password, user.password);

    if (!isHashedOk) {
     throw new UnauthorizedException('Credentials are incorrect');
    }

    // if (!user.accountValidated) {
    //  throw new UnauthorizedException('Please validate your account');
    // }

    return this.getJwt({
      email: user.email,
      id: user.id,
      name: user.name,
      userGrant: user.userGrant
    });

 }

 private getJwt(payload: JwtPayload) {
  const token = this.jwtService.sign(payload);
  return token;

 }

  findAll() {
    return `This action returns all token`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
