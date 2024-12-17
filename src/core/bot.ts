import { Client, create, Message, STATE } from '@open-wa/wa-automate';
import { inject, injectable } from 'inversify';
import { OptionsConfig } from '../config/wa-automate';
import { StepManager } from './step-manager';

@injectable()
export class Bot {
  private client!: Client;

  constructor(@inject(StepManager) private stepManager: StepManager) {}

  public async initialize() {
    const optionsConfig = new OptionsConfig(true, this.start);
    const options = optionsConfig.getConfig();

    const client = await create(options);
    await this.start(client);
  }

  private async start(client: Client) {
    client.onStateChanged((state: STATE) => {
      console.log('[APP]', state);
      if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus();
    });

    client.onMessage(async (message: Message) => {
      console.log(
        '\x1b[1;36m[NOVA MENSAGEM]\x1b[0m',
        message.from,
        'disse',
        message.body
      );
      await this.stepManager.processMessage(client, message);
    });
  }
}
