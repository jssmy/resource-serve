import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor() { }

  update(id: string, updateUserDto: UpdateUserDto) {
    return {
      id,
      updateUserDto,
    };
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
