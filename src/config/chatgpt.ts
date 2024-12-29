import { config } from 'dotenv';
import OpenAI from 'openai';
config();

export const enableChatGPT = process.env.ENABLE_CHATGPT === 'true';
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
