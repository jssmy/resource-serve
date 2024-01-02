import { Injectable } from '@nestjs/common';
import { CreateRevokeTokenDto } from './dto/create-revoke-token.dto';
import { UpdateRevokeTokenDto } from './dto/update-revoke-token.dto';

@Injectable()
export class RevokeTokenService {
  create(createRevokeTokenDto: CreateRevokeTokenDto) {
    return 'This action adds a new revokeToken';
  }

  findAll() {
    return `This action returns all revokeToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} revokeToken`;
  }

  update(id: number, updateRevokeTokenDto: UpdateRevokeTokenDto) {
    return `This action updates a #${id} revokeToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} revokeToken`;
  }
}
