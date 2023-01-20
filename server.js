import * as dotenv from 'dotenv';
dotenv.config();

const config = await import('./Config/index.js');
const {App} = await import('./App/index.js');

const app = new App(config);
await app.init();
