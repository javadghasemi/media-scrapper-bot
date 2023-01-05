import {app} from './app.js';
import {constants} from './constants.js';
import {proxy} from './proxy.js';
import {soundcloud} from "./soundcloud.js";

export default {
  ...app,
  constants,
  proxy,
  soundcloud
}