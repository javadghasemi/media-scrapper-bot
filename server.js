import * as dotenv from 'dotenv';
dotenv.config();

const {App} = await import('./App/index.js');

const app = new App();
await app.init();
