import {ScrapperBotController} from "./Controller/scrapper-bot.controller.js";
import config from "../Config/index.js";

const scrapperBotController = new ScrapperBotController({
  soundcloud: {
    CLIENT_ID: config.soundcloud.CLIENT_ID
  },
  scrapperService: {
    baseURL: config.scrapper.baseURL,
    timeout: config.scrapper.timeout,
    serviceVersion: config.scrapper.serviceVersion
  }
});

export function events(bot) {
  bot.start(scrapperBotController.start);
  bot.help(scrapperBotController.help);
  bot.hears(config.constants.SOUNDCLOUD_REGEX, scrapperBotController.scrapSoundcloud.bind(scrapperBotController));
}