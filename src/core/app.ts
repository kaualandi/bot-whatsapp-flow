import { inject, injectable } from 'inversify';
import { Bot } from './bot';
import { Server } from './server';

@injectable()
export class App {
  constructor(
    @inject(Bot) private bot: Bot,
    @inject(Server) private server: Server
  ) {}

  public async start() {
    try {
      await this.bot.initialize();
      console.log('\x1b[1;32m[APP] Bot iniciado com sucesso!\x1b[0m');

      console.log('\x1b[1;32m[APP] Iniciando servidor JSON\x1b[0m');
      this.server.start();
    } catch (error) {
      console.error('\x1b[1;31m[APP ERROR]\x1b[0m', error);
    }
  }
}
