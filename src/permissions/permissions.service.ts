import {
  BadRequestException,
  ForbiddenException,
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
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const permission = new PermissionFactory(createPermissionDto).create();
      await this.permissionRepository.save(permission);
      return new SuccessHandle('Permission created');
    } catch (err) {
      this.handleDBException(err);
    }
  }

  findAll() {
    return this.permissionRepository.find();
  }

  async findAllByParentId(id: string, limit: number, page: number) {
    const skip = (page - 1) * limit;

    const queryBuilder =
      this.permissionRepository.createQueryBuilder('permission');

    if (id) {
      queryBuilder.where('permission.parent_id = :parentId', { parentId: id });
    } else {
      queryBuilder.where('permission.parent_id IS NULL');
    }

    const [data, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      limit,
    };
  }

  async findOne(id: string) {
    const permission = await this.permissionRepository.findOneBy({ id });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const uptaded = await this.permissionRepository.update(id, {
      method: null,
      route: null,
      ...updatePermissionDto,
    });

    if (uptaded.affected <= 0) {
      throw new NotFoundException('Role not found');
    }

    return new SuccessHandle('Permission updated');
  }

  async remove(id: string) {
    const permission = await this.findOne(id);

    if (permission.protected) {
      throw new ForbiddenException('This permission can not remove');
    }

    this.permissionRepository.remove(permission);
    return new SuccessHandle('Permission removed');
  }

  private handleDBException(error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const [, role] = error.sqlMessage.split("'");
      throw new BadRequestException(`Permission "${role}" is already exist`);
    }

    throw new InternalServerErrorException(error.sqlMessage);
  }
}
