import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessHandle } from '@commons/classes/success.handle';
import { CreatedHandle } from '@commons/classes/created.handle';
import { Permission } from '@permissions/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const permissions = await this.permissionRepository.find({
        where: { id: In(createRoleDto.permissions) },
      });

      if (permissions.length !== createRoleDto.permissions.length) {
        throw new BadRequestException('Algunos permisos no existen');
      }

      await this.roleRepository.save({
        name: createRoleDto.name,
        permissions,
      });

      return new CreatedHandle('Rol creado exitosamente');
    } catch (err) {
      this.handleDBException(err);
    }
  }

  async findAll(limit: number, page: number) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.roleRepository
      .createQueryBuilder('roles')
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

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });

    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    //TODO: add permissions updated relations
    const role = await this.findOne(id);

    const permissions = await this.permissionRepository.find({
      where: { id: In(updateRoleDto.permissions) },
    });

    if (permissions.length !== updateRoleDto.permissions.length) {
      throw new BadRequestException('Algunos permisos no existen');
    }

    const permissionsProtected = permissions.filter(
      (permission) => permission.protected,
    );
    const currentPermissionProtected = role.permissions.filter(
      (permission) => permission.protected,
    );

    if (
      currentPermissionProtected.length < permissionsProtected.length &&
      role.protected
    ) {
      throw new ForbiddenException('Algunos permisos no pueden ser eliminados');
    }

    if (!role.protected) {
      role.name = updateRoleDto.name;
    }

    role.permissions = permissions;

    this.roleRepository.save(role);

    return new SuccessHandle('Rol actualizado exitosamente');
  }

  async remove(id: number) {
    const role = await this.findOne(id);

    if (role.protected) {
      throw new ForbiddenException('Este rol no puede ser eliminado');
    }

    role.permissions = [];
    await this.roleRepository.save(role);

    this.roleRepository.delete(role.id);

    return new SuccessHandle('Rol eliminado exitosamente');
  }

  private handleDBException(error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const [, role] = error.sqlMessage.split("'");
      throw new BadRequestException(`El rol ${role} ya existe`);
    }

    throw new InternalServerErrorException(error.sqlMessage);
  }
}
