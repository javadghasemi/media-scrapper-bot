import {ScrapperBotController} from "./Controller/ScrapperBot.controller.js";
import config from "../Config/index.js";

const scrapperBotController = new ScrapperBotController();

export function events(bot) {
  bot.start(scrapperBotController.start);
  bot.help(scrapperBotController.help);
  bot.hears(config.constants.SOUNDCLOUD_REGEX, scrapperBotController.scrapSoundcloud.bind(scrapperBotController));
}