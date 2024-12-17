import { injectable } from 'inversify';
import jsonServer from 'json-server';

@injectable()
export class Server {
  private server = jsonServer.create();
  private router = jsonServer.router('db.json');
  private middlewares = jsonServer.defaults();
  private port: number;

  constructor() {
    this.port = process.env.JSON_SERVER_PORT
      ? parseInt(process.env.JSON_SERVER_PORT)
      : 3001;
  }

  public start() {
    this.server.use(this.middlewares);
    this.server.use(this.router);

    this.server.listen(this.port, () => {
      console.log(
        `\x1b[1;32m[SERVER] Servidor rodando na porta ${this.port}\x1b[0m`
      );
    });
  }
}
