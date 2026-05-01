import { HttpMethod } from '@commons/enums/http- methods';
import { PermissionFactory } from '@permissions/fatories/permission.factory';
import { TypePermissions } from '@permissions/types/type-permissions.type';

export const permissionesFactories = [
  /*****************************************/
  /*    API                              */
  /*****************************************/
  // roles

  new PermissionFactory({
    name: 'Group role',
    type: TypePermissions.API,
    method: HttpMethod.GET,
  }).create(),

  new PermissionFactory({
    name: 'Group user',
    type: TypePermissions.API,
    method: HttpMethod.GET,
  }).create(),

  new PermissionFactory({
    name: 'Group permission',
    type: TypePermissions.API,
    method: HttpMethod.GET,
  }).create(),

  new PermissionFactory({
    name: 'Create role',
    type: TypePermissions.API,
    route: 'roles',
    method: HttpMethod.POST,
  }).create(),

  new PermissionFactory({
    name: 'Get all roles',
    type: TypePermissions.API,
    route: 'roles',
    method: HttpMethod.GET,
  }).create(),
  new PermissionFactory({
    name: 'Get role',
    type: TypePermissions.API,
    route: 'roles/:id',
    method: HttpMethod.GET,
  }).create(),
  new PermissionFactory({
    name: 'Update role',
    type: TypePermissions.API,
    route: 'roles/:id',
    method: HttpMethod.PUT,
  }).create(),

  new PermissionFactory({
    name: 'Delete role',
    type: TypePermissions.API,
    route: 'roles/:id',
    method: HttpMethod.DELETE,
  }).create(),
  // permissions
  new PermissionFactory({
    name: 'Create permission',
    type: TypePermissions.API,
    route: 'permissions',
    method: HttpMethod.POST,
  }).create(),

  new PermissionFactory({
    name: 'Get all permissions',
    type: TypePermissions.API,
    route: 'permissions',
    method: HttpMethod.GET,
  }).create(),

  // TODO: Migrar a nuevo sistema de paths - Unificar estas dos rutas en una sola
  // Actualmente separadas porque NestJS 11 no soporta parámetros opcionales en rutas
  // En el nuevo sistema se usará: 'permissions/parent/:id?'
  new PermissionFactory({
    name: 'Get all permission by parent permission',
    type: TypePermissions.API,
    route: 'permissions/parent',
    method: HttpMethod.GET,
  }).create(),

  new PermissionFactory({
    name: 'Get all permission by parent permission with id',
    type: TypePermissions.API,
    route: 'permissions/parent/:id',
    method: HttpMethod.GET,
  }).create(),

  new PermissionFactory({
    name: 'Get permission',
    type: TypePermissions.API,
    route: 'permissions/:id',
    method: HttpMethod.GET,
  }).create(),

  new PermissionFactory({
    name: 'Update permission',
    type: TypePermissions.API,
    route: 'permissions/:id',
    method: HttpMethod.PUT,
  }).create(),

  new PermissionFactory({
    name: 'Delete permission',
    type: TypePermissions.API,
    route: 'permissions/:id',
    method: HttpMethod.DELETE,
  }).create(),

  new PermissionFactory({
    name: 'Get all users',
    type: TypePermissions.API,
    route: 'user',
    method: HttpMethod.GET,
  }).create(),

  new PermissionFactory({
    name: 'Get one user',
    type: TypePermissions.API,
    route: 'user/:id',
    method: HttpMethod.GET,
  }).create(),

  new PermissionFactory({
    name: 'Update user',
    type: TypePermissions.API,
    route: 'user/:id',
    method: HttpMethod.PUT,
  }).create(),

  /*****************************************/
  /*    MENUS                              */
  /*****************************************/

  new PermissionFactory({
    name: 'Users',
    type: TypePermissions.MENU,
    route: 'managment/users',
    order: 1,
  }).create(),

  new PermissionFactory({
    name: 'Roles',
    type: TypePermissions.MENU,
    route: 'managment/roles',
    order: 2,
  }).create(),

  new PermissionFactory({
    name: 'Permissions',
    type: TypePermissions.MENU,
    route: 'managment/permissions',
    order: 3,
  }).create(),

  new PermissionFactory({
    name: 'Analytics',
    type: TypePermissions.MENU,
    route: 'managment/analitycs',
    order: 4,
  }).create(),

  /*****************************************/
  /*    OPTION                              */
  /*****************************************/

  new PermissionFactory({
    name: 'Add new user option button',
    type: TypePermissions.OPTION,
  }).create(),

  new PermissionFactory({
    name: 'Update user option button',
    type: TypePermissions.OPTION,
  }).create(),
];
