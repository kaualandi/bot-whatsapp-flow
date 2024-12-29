import { injectable } from 'inversify';
import { openai } from '../../config/chatgpt';
import { optionChosenContext } from '../contexts/option-chosen';

@injectable()
export class ChatGPTService {
  private openai = openai;
  private model = 'gpt-4o';

  async getOptionChosen(options: string, body: string) {
    const completion = await this.openai.chat.completions.create({
      model: this.model,
      store: true,
      messages: [
        { role: 'system', content: optionChosenContext },
        { role: 'system', content: options },
        { role: 'user', content: body },
      ],
    });
    return completion.choices[0].message.content;
  }
}
