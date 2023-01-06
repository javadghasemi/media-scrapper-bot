import scdl from "soundcloud-downloader";
import config from "../../Config/index.js";

export class ScrapperBotController {
  #soundcloud;

  constructor() {
    this.#soundcloud = scdl.create({
      clientID: config.soundcloud.CLIENT_ID
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
      const trackInfo = await this.#soundcloud.getInfo(url);
      const trackPhoto = trackInfo.artwork_url.replace('large', 't500x500');
      const caption = [
        `🎧 Track: *${trackInfo.title}*\n`,
        `🔗 Source: ${trackInfo.permalink_url}\n`,
      ];

      ctx.sendPhoto(trackPhoto, {caption: caption.join(''), parse_mode: "Markdown"});

      const track = await this.#soundcloud.download(url);
      await ctx.sendAudio({
        source: track,
        filename: trackInfo.title,
        caption: caption.join('')
      });
    } catch (e) {
      console.log('=--->>>', e);
    }
  }
}