import { inject, injectable } from 'inversify';
import { enableChatGPT } from '../../config/chatgpt';
import { IStep } from '../../core/models/step';
import { ChatGPTService } from './chatgpt-service';

@injectable()
export class StepService {
  constructor(@inject(ChatGPTService) private chatGPTService: ChatGPTService) {}

  async getOptionChosen(step: IStep, body: string) {
    if ('choicesContext' in step && enableChatGPT) {
      try {
        const chosen = await this.chatGPTService.getOptionChosen(
          step.choicesContext || '',
          body
        );

        return parseInt(chosen || '-1') + '';
      } catch (error) {
        return parseInt(body || '-1') + '';
      }
    }

    return parseInt(body || '-1') + '';
  }
}
