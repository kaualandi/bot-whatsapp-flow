import { Client, Message } from '@open-wa/wa-automate';
import { Step } from '../core/decorators';
import { WithChoices } from '../core/models/step';

@Step({ selector: 1 })
export class Step1 implements WithChoices {
  public choices = {
    1: this.choice1,
    2: this.choice2,
  };

  async choice1(client: Client, message: Message) {
    await client.sendText(message.from, 'Você escolheu a opção 1');
    return 0;
  }

  async choice2(client: Client, message: Message) {
    await client.sendText(message.from, 'Você escolheu a opção 2');
    return 0;
  }
}
