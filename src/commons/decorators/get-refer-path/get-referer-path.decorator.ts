import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';
import { trim } from 'src/commons/utils/string.util';

export const GetRefererPath = createParamDecorator((__data,ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const headers = request.headers as IncomingHttpHeaders;

    const path = headers.path as string;
    const referer = headers.referer;


    if (!path) {
        throw new BadRequestException('path header is missing');
    }

    if (!referer) {
        throw new BadRequestException('referer header is missing');
    }

    return `${trim(referer, '/')}/${trim(path, '/')}`;

});
