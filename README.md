<h1 align="center">Olá, bem vindo!</h1>
<p align="center">
<img alt="Versão" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
<img alt="Licença: APACHE 2.0" src="https://img.shields.io/badge/License-APACHE 2.0-yellow.svg" />
<img alt="npm version" src="https://img.shields.io/npm/v/@open-wa/wa-automate.svg?color=green"/>
<img alt="node-version" src="https://img.shields.io/node/v/@open-wa/wa-automate"/>
<img alt="made-with-node" src="https://img.shields.io/badge/Made%20with-node-1f425f.svg"/>

</p>

> Olá, esse bot de whatsapp foi criado com foco em atendimento ao cliente.

## Como iniciar

```bash
git clone https://github.com/kaualandi/bot-whatsapp-flow.git
```

```bash
cd bot-whatsapp-flow
```

```bash
npm install
```

### Variáveis de ambiente

Você precisará de um arquivo `.env`, copie o `.env.example`

```bash
cp .env.example .env
```

O que tem em sua env:

- **JSON_SERVER_PORT**: Porta do servidor json-server, onde é salvo as informações dos usuários.
- **EXPIRE_TIME**: Tempo de expiração da seção do usuário em milissegundos (o padrão é 2 minutos).

### Ambiente de Desenvolvimento

```bash
npm start
```

Isso iniciará o bot em modo de desenvolvimento, aparecerá um QR Code para escanear.

O Json-Server também será iniciado, é nele onde é salvo as informações dos usuários.

### Ambiente de Produção

Acredito que você não queria que o server fique ocupando uma instância do terminal. Devemos então prepará-lo para o [PM2](https://pm2.keymetrics.io/).

> Não ensinarei aqui como configurar o [PM2](https://pm2.keymetrics.io/). Mas se quiser, você pode ver o [guia](https://pm2.keymetrics.io/docs/usage/quick-start/) para isso.
> Verifique de instalar também o suporte para Typescript do PM2.

Se ainda não estiver, entre na pasta do servidor

Inicie o server com o PM2:

```bash
pm2 start src/index.ts --name meu-bot
```

Para escanear o QR Code, basta acessar o endereço `http://<seu_ip>:3012`.

## Passos ou _steps_ do bot

### Como funciona?

O passo do bot é o arquivo que ele chamará para executar uma ação em determinado momento.

Por exemplo: Quando o usuário inicia uma conversa, o código o cadastrará e será chamado o passo 0. Fazendo o que for configurado nele.

Observe o código abaixo:

```typescript
import { Client, Message } from '@open-wa/wa-automate';
import { Step } from '../core/decorators/step-decorator';
import { OnInit } from '../core/models/step';

@Step({ selector: 0 })
export class Step0 implements OnInit {
  async onInit(client: Client, message: Message): Promise<number> {
    await client.sendText(message.from, 'Olá, tudo bem? Escolha 1 ou 2');
    return 1;
  }
}
```

Ele é o primeiro passo, como indica o seletor no decorador `@Step({ selector: 0 })`.

O método `onInit` é o hook que será chamado quando o passo é carregado. Ele espera um retorno de um número, que é o próximo passo que o bot deve chamar na próxima vez que o usuário enviar uma mensagem.

Mas você também pode usar um choices, como no código abaixo:

```typescript
import { Client, Message } from '@open-wa/wa-automate';
import { Step } from '../core/decorators';
import { IChoice, WithChoices } from '../core/models/step';

@Step({ selector: 1 })
export class Step1 implements WithChoices {
  public choices: Record<string, IChoice> = {
    '1': this.choice1,
    '2': this.choice2,
  };

  async choice1(client: Client, message: Message) {
    await client.sendText(message.from, 'Você escolheu a opção 1');
    return 0;
  }

  async choice2(client: Client, message: Message) {
    await client.sendText(message.from, 'Você escolheu a opção 2');
    return 0;
  }
}
```

O método `choice1` e `choice2` são as escolhas que o usuário pode fazer. Eles são chamados quando o usuário envia a mensagem correspondente a chave do objeto `choices`.

**Dica**: Você pode combinar o uso de `onInit` e `WithChoices` para criar opções dinamicas vindo de uma API, por exemplo.

### Como criar um passo?

Para criar um passo, basta criar um arquivo na pasta `src/steps` com o nome `step<number>.ts`, ou como preferir.

Depois disso, você deve criar uma classe com o decorador `@Step`, não se esqueça de expecificar um seletor (`selector`) que ainda não foi usado para evitar sobreposição.

Implementar a interface `OnInit` ou `WithChoices` para te auxiliar com a tipagem.

Você também precisa importar de forma explícita o passo no arquivo `src/steps/index.ts`, para que o bot possa carregar ele.

### API e serviços

Chamadas de API e outros serviços devem ser feitos na pasta `src/public/services`. Crie conforme o `user-service.ts` para te auxiliar. Mas não se esqueça de usar o decorator `@injectable` para que o serviço para uso do DI. Também o importe no arquivo `src/config/inversify.ts`, siga o exemplo do `UserService`.

O Axios é o cliente HTTP que está sendo utilizado, suas configurações estão no arquivo `src/config/axios.ts`.

## O que está por vir?

- [ ] Testes
- [ ] Logs com Sentry
- [ ] Migração para um banco real
- [ ] Containarização
- [ ] Documentação
- [ ] Internacionalização (i18n)
- [ ] CI/CD
- [ ] Histórico de conversa
- [ ] Humanização das mensagens com IA
- [ ] Integração com outros serviços (n8n)
- [ ] Feedback do usuário

## Autor

👤 **Kauã Landi**

- Website: https://kaualf.com
- Github: [@kaualandi](https://github.com/kaualandi)
- LinkedIn: [@kaualandi](https://linkedin.com/in/kaualandi)
- Instagram: [@kauaalandi](https://www.instagram.com/kauaalandi/)

## 🤝 Contribuição

Contribuições, problemas e solicitações de recursos são bem-vindos! <br/> Sinta-se à vontade para verificar a [página de problemas](https://github.com/kaualandi/bot-whatsapp-flow/issues). Você também pode dar uma olhada na [página de contribuição](https://github.com/kaualandi/bot-whatsapp-flow/pulls).

## 🥰 Mostre seu apoio

Dê uma ⭐️ se este projeto te ajudou!
