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
    const url = ctx.match.input;
    const trackInfo = await this.#soundcloud.getInfo(url);
    const trackPhoto = trackInfo.artwork_url.replace('large', 't500x500');
    const photoCaption = [
      `🎧 Track: *${trackInfo.title}*\n`,
      `🔗 Source: ${trackInfo.permalink_url}\n`,
    ];

    ctx.sendPhoto(trackPhoto, {caption: photoCaption.join(''), parse_mode: "Markdown"});

    // const track = await this.#soundcloud.download(url);
    // console.log(track)
    // ctx.replyWithAudio({
    //   content: ''
    // });
  }
}