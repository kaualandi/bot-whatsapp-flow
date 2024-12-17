import 'reflect-metadata';
import container from './config/inversify';
import { App } from './core/app';

import './steps';

(async () => {
  const app = container.get(App);
  await app.start();
})();
