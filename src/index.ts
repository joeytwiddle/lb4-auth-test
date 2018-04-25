import {AuthApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {AuthApplication};

export async function main(options?: ApplicationConfig) {
  const app = new AuthApplication(options);
  await app.boot();
  await app.start();
  return app;
}
