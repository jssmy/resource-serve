import { HttpMethod } from 'src/commons/enums/http- methods';
import { PermissionFactory } from 'src/permissions/fatories/permission.factory';
import { TypePermissions } from 'src/permissions/types/type-permissions.type';

export const permissionesFactories = [
  // roles
  new PermissionFactory({
    name: 'Crear role',
    type: TypePermissions.API,
    route: 'roles',
    method: HttpMethod.POST
  }).create(),
  new PermissionFactory({
    name: 'Obtener roles',
    type: TypePermissions.API,
    route: 'roles',
    method: HttpMethod.GET
  }).create(),
  new PermissionFactory({
    name: 'Obtener rol',
    type: TypePermissions.API,
    route: 'roles/:id',
    method: HttpMethod.GET
  }).create(),
  new PermissionFactory({
    name: 'Actualizar rol',
    type: TypePermissions.API,
    route: 'roles/:id',
    method: HttpMethod.PUT
  }).create(),
  new PermissionFactory({
    name: 'Eliminar role',
    type: TypePermissions.API,
    route: 'roles/:id',
    method: HttpMethod.DELETE
  }).create(),
  // permissions
  new PermissionFactory({
    name: 'Crear permiso',
    type: TypePermissions.API,
    route: 'permissions',
    method: HttpMethod.POST
  }).create(),
  new PermissionFactory({
    name: 'Obtener permisos',
    type: TypePermissions.API,
    route: 'permissions',
    method: HttpMethod.GET
  }).create(),

  new PermissionFactory({
    name: 'Obtener permiso',
    type: TypePermissions.API,
    route: 'permissions/:id',
    method: HttpMethod.GET
  }).create(),

  new PermissionFactory({
    name: 'Actualizar permiso',
    type: TypePermissions.API,
    route: 'permissions/:id',
    method: HttpMethod.PUT
  }).create(),

  new PermissionFactory({
    name: 'Eliminar permiso',
    type: TypePermissions.API,
    route: 'permissions/:id',
    method: HttpMethod.DELETE
  }).create(),



  new PermissionFactory({
    name: 'Users',
    type: TypePermissions.MENU,
    route: 'managment/users',
    order: 1
  }).create(),


  new PermissionFactory({
    name: 'Roles',
    type: TypePermissions.MENU,
    route: 'managment/roles',
    order: 2 
  }).create(),

  new PermissionFactory({
    name: 'Permissions',
    type: TypePermissions.MENU,
    route: 'managment/permissions',
    order: 3
  }).create(),
  

  new PermissionFactory({
    name: 'Analytics',
    type: TypePermissions.MENU,
    route: 'managment/analitycs',
    order: 4
  }).create(),



  new PermissionFactory({
    name: 'Get all users',
    type: TypePermissions.API,
    route: 'user',
    method: HttpMethod.GET
  }).create(),

  new PermissionFactory({
    name: 'Get one user',
    type: TypePermissions.API,
    route: 'user/:id',
    method: HttpMethod.GET
  }).create(),
  

  new PermissionFactory({
    name: 'Update user',
    type: TypePermissions.API,
    route: 'user/:id',
    method: HttpMethod.PUT
  }).create(),

  new PermissionFactory({
    name: 'Add new user option button',
    type: TypePermissions.OPTION
  }).create(),

  
  new PermissionFactory({
    name: 'Update user option button',
    type: TypePermissions.OPTION
  }).create(),


  


];
