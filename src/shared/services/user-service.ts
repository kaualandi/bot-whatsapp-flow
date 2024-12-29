import { ChatId, Message } from '@open-wa/wa-automate';
import { injectable } from 'inversify';
import { http } from '../../config/axios';
import { User } from '../../core/models/user';

@injectable()
export class UserService {
  private http = http;

  async getUser(id: ChatId) {
    return this.http.get<User>(`/users/${id}`);
  }

  async submitNewUser(id: ChatId, name: string) {
    return this.http.post<User>(`/users`, {
      id,
      name,
      step: 0,
      intervention: true,
      lastMessageTime: new Date(),
    });
  }

  async updateStep(id: ChatId, step: number) {
    return this.http.patch<User>(`/users/${id}`, { step });
  }

  async updateIntervention(id: ChatId, intervention: boolean) {
    return this.http.patch<User>(`/users/${id}`, { intervention });
  }

  async updateLastMessageTime(id: ChatId, lastMessageTime: Date) {
    return this.http.patch<User>(`/users/${id}`, { lastMessageTime });
  }

  public async fetchOrCreateUser(message: Message): Promise<User | undefined> {
    try {
      return await this.getExistingUser(message.from);
    } catch (error) {
      if (this.isAxiosNotFoundError(error)) {
        return await this.createNewUser(message.from, message.sender.name);
      }
      console.error('Erro ao buscar usuário:', error);
      return undefined;
    }
  }

  private async getExistingUser(userId: ChatId): Promise<User> {
    const response = await this.getUser(userId);
    return response.data;
  }

  private async createNewUser(userId: ChatId, userName: string): Promise<User> {
    console.log('Usuário não encontrado, criando novo usuário');
    const response = await this.submitNewUser(userId, userName);
    return response.data;
  }

  private isAxiosNotFoundError(error: any): boolean {
    return error?.response?.status === 404;
  }
}
