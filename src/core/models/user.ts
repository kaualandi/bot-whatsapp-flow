import { ChatId } from '@open-wa/wa-automate';

export interface User {
  id: ChatId;
  step: number;
  intervention: boolean;
  lastMessageTime: string;
}
