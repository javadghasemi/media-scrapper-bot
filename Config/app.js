import {readFileSync} from 'node:fs';
import {join} from 'node:path';

export const app = {
  mode: process.env.MODE || 'dev',
  botToken: process.env.BOT_TOKEN,
  webhook: {
    domain: process.env.DOMAIN,
    port: process.env.PORT,
    certificate: readFileSync(join('..', 'cert', 'public.pem'))
  },
}
