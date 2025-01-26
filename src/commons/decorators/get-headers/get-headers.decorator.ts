import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetHeaders = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const headers = req.headers;
    return key ? headers[key] : headers;
  },
);
