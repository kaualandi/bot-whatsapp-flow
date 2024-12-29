import { Client, Message } from '@open-wa/wa-automate';

export type IChoice = (client: Client, message: Message) => Promise<number>;

export interface OnInit {
  onInit(client: Client, message: Message): Promise<number>;
}

export type IChoices = Record<string, IChoice>;
export interface WithChoices {
  choicesContext?: string;
  choices: IChoices;
}

export type IStep = OnInit | WithChoices;
