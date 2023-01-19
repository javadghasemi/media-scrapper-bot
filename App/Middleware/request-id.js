import {v4 as uidV4} from 'uuid';

export function requestId(ctx, next) {
  ctx.requestId = uidV4();
  next();
}