import { Client, Message } from '@open-wa/wa-automate';
import { Step } from '../core/decorators/step-decorator';
import { OnInit } from '../core/models/step';

@Step({ selector: 0 })
export class Step0 implements OnInit {
  async onInit(client: Client, message: Message): Promise<number> {
    await client.sendText(message.from, 'Olá, tudo bem? Escolha 1 ou 2');
    return 1;
  }
}
