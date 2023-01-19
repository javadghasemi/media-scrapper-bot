import axios from "axios";

export default class Service {
  _request;

  constructor(config) {
    this._request = axios.create({
      baseURL: `${config.baseURL}/scraper@${config.serviceVersion}`,
      timeout: config.timeout
    });
  }
}