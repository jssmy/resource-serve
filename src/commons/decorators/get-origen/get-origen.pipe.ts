import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';

export const GetRequestOrigin = createParamDecorator(
  (__data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const headers = request.headers as IncomingHttpHeaders;

    const origin = headers.origin;

    if (!origin) {
      throw new BadRequestException('origin header is missing');
    }

    return origin.trim();
  },
);
