import { Client, Message } from '@open-wa/wa-automate';
import { Step } from '../core/decorators/step-decorator';
import { OnInit } from '../core/models/step';
import { messages } from '../utils/messages';

@Step({ selector: 0 })
export class Step0 implements OnInit {
  async onInit(client: Client, message: Message): Promise<number> {
    await client.sendText(message.from, messages.welcome());
    await client.sendText(message.from, messages.askForOptions());
    return 1;
  }
}
