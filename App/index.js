import {Telegraf} from 'telegraf';

import {events} from "./events.js";
import {loggerMiddleware} from "./Middleware/logger.js";
import {requestId} from "./Middleware/request-id.js";
import {validateUrl} from "./Middleware/validate-url.js";

export class App {
  #bot;
  #config;

  constructor(config) {
    this.#config = config;
  }

  async init() {
    this.#bot = new Telegraf(this.#config.botToken);
    await this.#bot.launch({
      webhook: {
        domain: this.#config.webhook.domain,
        port: this.#config.webhook.port,
        certificate: this.#config.webhook.certificate
      }
    });

    /*
     * Initialize middlewares...
     */
    this.#bot.use(requestId);
    this.#bot.use(loggerMiddleware(this.#config.logger));
    this.#bot.use(validateUrl);

    /*
     * Register telegram events
     */
    events(this.#bot);

    console.log(`Bot started successfully...`);

    process.once('SIGINT', () => this.#bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.#bot.stop('SIGTERM'));
  }
}