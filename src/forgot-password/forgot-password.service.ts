import { Injectable } from '@nestjs/common';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { UpdateForgotPasswordDto } from './dto/update-forgot-password.dto';

@Injectable()
export class ForgotPasswordService {
  create(createForgotPasswordDto: CreateForgotPasswordDto) {
    return 'This action adds a new forgotPassword';
  }

  findAll() {
    return `This action returns all forgotPassword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forgotPassword`;
  }

  update(id: number, updateForgotPasswordDto: UpdateForgotPasswordDto) {
    return `This action updates a #${id} forgotPassword`;
  }

  remove(id: number) {
    return `This action removes a #${id} forgotPassword`;
  }
}
