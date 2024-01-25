import { PermissionFactory } from 'src/permissions/fatories/permission.factory';
import { TypePermissions } from 'src/permissions/types/type-permissions.type';

export const permissionesFactories = [
  // roles
  new PermissionFactory({
    name: 'Crear role',
    type: TypePermissions.API,
    route: 'roles',
  }).create(),
  new PermissionFactory({
    name: 'Obtener roles',
    type: TypePermissions.API,
    route: 'roles',
  }).create(),
  new PermissionFactory({
    name: 'Obtener rol',
    type: TypePermissions.API,
    route: 'roles/:id',
  }).create(),
  new PermissionFactory({
    name: 'Actualizar rol',
    type: TypePermissions.API,
    route: 'roles/:id',
  }).create(),
  new PermissionFactory({
    name: 'Eliminar role',
    type: TypePermissions.API,
    route: 'roles/:id',
  }).create(),
  // permissions
  new PermissionFactory({
    name: 'Crear permiso',
    type: TypePermissions.API,
    route: 'permissions',
  }).create(),
  new PermissionFactory({
    name: 'Obtener permisos',
    type: TypePermissions.API,
    route: 'permissions',
  }).create(),
  new PermissionFactory({
    name: 'Obtener permiso',
    type: TypePermissions.API,
    route: 'permissions/:id',
  }).create(),
  new PermissionFactory({
    name: 'Actualizar permiso',
    type: TypePermissions.API,
    route: 'permissions/:id',
  }).create(),
  new PermissionFactory({
    name: 'Eliminar permiso',
    type: TypePermissions.API,
    route: 'permissions/:id',
  }).create(),
];
