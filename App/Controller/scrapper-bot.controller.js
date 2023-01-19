import ScrapperService from "../Service/scrapper-service.js";

export class ScrapperBotController {
  #scrapperService;

  constructor(config) {
    this.#scrapperService = new ScrapperService({
      baseURL: config.scrapperService.baseURL,
      timeout: config.scrapperService.timeout,
      serviceVersion: config.scrapperService.serviceVersion
    });
  }

  start(ctx) {
    ctx.reply('Welcome');
  }

  help(ctx) {
    ctx.reply('Send me a sticker');
  }

  async scrapSoundcloud(ctx) {
    try {
      const url = ctx.match.input;
      const trackInfo = await this.#scrapperService.info(url);

      const thumbnail = trackInfo.thumbnail;
      const caption = [
        `🎧 Track: *${trackInfo.title}*\n`,
        `🔗 Source: ${trackInfo.source_url}\n`,
      ];

      ctx.sendPhoto(thumbnail, {caption: caption.join(''), parse_mode: "Markdown"});

      const track = await this.#scrapperService.download(url);
      ctx.sendAudio({
        source: track,
        filename: trackInfo.title,
        caption: caption.join('')
      });
    } catch (e) {
      console.log('ERROR!!!!...', e);
      ctx.reply('Unexpected error! Please try again later...');
    }
  }
}