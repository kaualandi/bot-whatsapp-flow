import { Client, Message } from '@open-wa/wa-automate';

export type IChoice = (client: Client, message: Message) => Promise<number>;

export interface OnInit {
  onInit(client: Client, message: Message): Promise<number>;
}

export interface WithChoices {
  choices: Record<string, IChoice>;
}

export type IStep = OnInit | WithChoices;
