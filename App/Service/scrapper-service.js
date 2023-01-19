import Service from "./Service.js";

export default class ScrapperService extends Service {
  async info(url) {
    const response = await this._request.get(`/info`, {params: {url}});

    return response.data;
  }

  async download(url) {
    const response = await this._request.post('/download', {
      url
    }, {
      responseType: "stream"
    });

    return response.data;
  }
}