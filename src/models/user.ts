import { ChatId } from "@open-wa/wa-automate";

export interface User {
  id: ChatId;
  name: string;
  step: number;
  lastMessageTime: Date;
  intervention: boolean;
}