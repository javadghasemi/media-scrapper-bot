import {app} from './app.js';
import {constants} from './constants.js';
import {proxy} from './proxy.js';
import {soundcloud} from "./soundcloud.js";
import {logger} from "./logger.js";
import {scrapper} from "./scrapper-service.js";

export default {
  ...app,
  constants,
  proxy,
  soundcloud,
  logger,
  scrapper
}