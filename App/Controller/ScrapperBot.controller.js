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
  
  #getProvder(url){
    if(url.indexOf('soundcloud')>-1){
       return soundcloudProvider;
    }
    return (url,ctx) => {ctx.reply('URL is not supported!');};
  }
  
  async download(ctx){
      const url = ctx.match.input;
      const provider = this.#getProvider(url);
      await provider(url,ctx);
  }  
  
  async scrapSoundcloud(ctx) {
      const url = ctx.match.input;
      await this.soundcloudProvider(url,ctx);
  }

  async soundcloudProvider(url,ctx) {
    try {
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
