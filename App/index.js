import {default as proxy} from "node-global-proxy";
import {Telegraf} from 'telegraf';

import config from "../Config/index.js";
import {events} from "./events.js";
import {loggerMiddleware} from "./Middleware/logger.js";
import {requestId} from "./Middleware/request-id.js";
import {validateUrl} from "./Middleware/validate-url.js";

export class App {
  #bot;

  constructor() {
    this.#initialProxy();
  }

  async init() {
    this.#bot = new Telegraf(config.botToken);
    await this.#bot.launch({
      webhook: {
        domain: config.webhook.domain,
        port: config.webhook.port,
        certificate: config.webhook.certificate
      }
    });

    /*
     * Initialize middlewares...
     */
    this.#bot.use(requestId);
    this.#bot.use(loggerMiddleware(config.logger));
    this.#bot.use(validateUrl);

    /*
     * Register telegram events
     */
    events(this.#bot);

    console.log(`Bot started successfully...`);

    process.once('SIGINT', () => this.#bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.#bot.stop('SIGTERM'));
  }

  /**
   * @description Set global proxy for bypass FUCKING filtering with Lantern!!!
   */
  #initialProxy() {
    if (config.mode === 'dev' && config?.proxy.enabled) {
      proxy.default.setConfig(`${config.proxy.host}:${config.proxy.port}`);
      proxy.default.start();
    }
  }
}