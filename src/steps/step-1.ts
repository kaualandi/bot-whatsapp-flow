import { Client, Message } from '@open-wa/wa-automate';
import { Step } from '../core/decorators';
import { IChoice, WithChoices } from '../core/models/step';
import { messages } from '../utils/messages';

@Step({ selector: 1 })
export class Step1 implements WithChoices {
  public choicesContext = messages.askForOptions();
  public choices: Record<string, IChoice> = {
    '1': this.choice1,
    '2': this.choice2,
    '3': this.choice3,
    '4': this.choice4,
  };

  async choice1(client: Client, message: Message) {
    await client.sendText(message.from, 'Você escolheu fazer um pedido');
    return 0;
  }

  async choice2(client: Client, message: Message) {
    await client.sendText(message.from, 'Você escolheu ver o encarte');
    return 0;
  }

  async choice3(client: Client, message: Message) {
    await client.sendText(message.from, 'Você escolheu ver o status do pedido');
    return 0;
  }

  async choice4(client: Client, message: Message) {
    await client.sendText(message.from, 'Você escolheu falar com um atendente');
    return 0;
  }
}
