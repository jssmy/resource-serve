import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessHandle } from 'src/commons/classes/success.handle';
import { CreatedHandle } from 'src/commons/classes/created.handle';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create(createRoleDto);
      await this.roleRepository.save(role);
      return new CreatedHandle('Role has been created');
    } catch (err) {
      this.handleDBException(err);
    }
  }

  findAllActive() {
    return this.roleRepository.findBy({ state: true });
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOneBy({ id });

    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const updated = await this.roleRepository.update(id, updateRoleDto);

    if (updated.raw <= 0) {
      throw new BadRequestException('Role not found');
    }

    return new SuccessHandle('Role updated');
  }

  async remove(id: number) {
    const updated = await this.roleRepository.update(id, { state: false });

    if (updated.raw <= 0) {
      throw new BadRequestException('Role not found');
    }

    return new SuccessHandle('Role removed');
  }

  private handleDBException(error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const [, role] = error.sqlMessage.split("'");
      throw new BadRequestException(`Role ${role} is already exist`);
    }

    throw new InternalServerErrorException(error.sqlMessage);
  }
}
