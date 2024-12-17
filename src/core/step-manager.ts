import { Client, Message } from '@open-wa/wa-automate';
import { inject, injectable } from 'inversify';
import { UserService } from '../shared/services/user-service';
import { messages } from '../utils/messages';
import { getRegisteredSteps } from './decorators';
import { User } from './models/user';

@injectable()
export class StepManager {
  private steps = getRegisteredSteps();

  constructor(@inject(UserService) private userService: UserService) {}

  public async processMessage(client: Client, message: Message) {
    console.log(this.steps.values());

    const user = await this.userService.fetchOrCreateUser(message);
    if (!user) {
      console.error('Erro no servidor, usuário não encontrado.');
      return;
    }

    try {
      await this.userService.updateLastMessageTime(user.id, new Date());
    } catch (error) {
      console.error('Erro ao atualizar lastMessageTime', error);
    }

    const nextStep = await this.processStep(client, message, user);
    if (nextStep !== user.step) {
      console.log(`Alterando step de ${user.step} para ${nextStep}`);
      try {
        await this.userService.updateStep(user.id, nextStep);
      } catch (error) {
        console.error('Erro ao atualizar step', error);
      }
    }
  }

  private async processStep(
    client: Client,
    message: Message,
    user: User
  ): Promise<number> {
    const stepInstance = this.steps.get(user.step);
    if (!stepInstance) {
      console.error(`Step ${user.step} não encontrado.`);
      return 0;
    }

    console.log(`Executando Step ${user.step}`);
    let newStep = user.step;

    if ('onInit' in stepInstance) {
      newStep = await stepInstance.onInit(client, message);
    }

    if ('choices' in stepInstance) {
      const choice = stepInstance.choices[parseInt(message.body)];
      if (!choice) {
        await client.sendText(message.from, messages.invalidChoice());
        return newStep;
      }

      newStep = await choice(client, message);
    }

    return newStep;
  }
}
