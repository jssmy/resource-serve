import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionFactory } from './fatories/permission.factory';
import { SuccessHandle } from 'src/commons/classes/success.handle';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) { }

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const permission = new PermissionFactory(createPermissionDto).create();
      await this.permissionRepository.save(permission);
    } catch (err) {
      this.handleDBException(err);
    }
  }

  findAll() {
    return this.permissionRepository.findBy({ state: true });
  }

  async findOne(id: string) {

    const permission = await this.permissionRepository.findOneBy({ id });

    if (permission) {
      throw new NotFoundException('Permission not found');
    }

    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const permission = this.permissionRepository.create(updatePermissionDto);
    const updated = await this.permissionRepository.update(id, permission);

    if (updated.raw <= 0) {
      throw new BadRequestException('Role not found');
    }

    return new SuccessHandle('Permission updated');
  }

  async remove(id: string) {
    const updated = await this.permissionRepository.update(id, {
      state: false,
    });

    if (updated.raw <= 0) {
      throw new BadRequestException('Permission not found');
    }

    return new SuccessHandle('Permission removed');
  }


  private handleDBException(error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const [, role] = error.sqlMessage.split("'");
      throw new BadRequestException(`Role ${role} is already exist`);
    }

    throw new InternalServerErrorException(error.sqlMessage);
  }
}
