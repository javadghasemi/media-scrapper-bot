import winston from "winston";

export function loggerMiddleware(options) {
  const logger = winston.createLogger(options);
  return function (ctx, next) {
    ctx.log = logger;

    logger.info(JSON.stringify({
      'request-id': ctx.requestId,
      chatId: ctx.chat.id,
      first_name: ctx.chat.first_name,
      last_name: ctx.chat.last_name || undefined,
      username: ctx.chat.username || undefined,
      message: ctx?.message?.text || ctx.match.input || undefined
    }, null, 2));
    next();
  }
}