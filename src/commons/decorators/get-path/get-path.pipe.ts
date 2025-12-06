import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';

export const GetRequestPath = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const headers = request.headers as IncomingHttpHeaders;

    const path = headers.path;

    if (!path) {
      throw new BadRequestException('origin header is missing');
    }

    return path;
  },
);
