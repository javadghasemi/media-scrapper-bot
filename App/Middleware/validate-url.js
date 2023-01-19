import validUrl from "valid-url";

export function validateUrl(ctx, next) {
  const url = ctx?.match?.input || ctx.message.text;

  if (!validUrl.is_uri(url)) {
    ctx.reply('Please Enter a valid URL');
  }

  next();
}