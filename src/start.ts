import { ChatId, Client, Message } from "@open-wa/wa-automate";
import { messages } from "./messages";
import { getUser, submitNewUser, updateUserLastMessageTime, updateUserStep } from "./service/user.service";
import { steps } from "./steps";

export async function start(client: Client, message: Message) {
  const { from, sender } = message;
  // ? For add client.reply() add "id" in to above defragment
  let { pushname } = sender;

  // ? Submiting proccess
  let step = 0;
  const user = await getUser(from);
  console.log(user);

  if (user.status !== 200 && user.status !== 404) {
    await client.sendText(from, messages.serverError());
    return console.log("Mensagem enviada");
  }

  if (!user.data) {
    console.log("USER	===> NÃO CADASTRADO");
    const newUser = await submitNewUser(from, pushname);

    if (newUser) {
      console.log("USER	===> CADASTRADO");
      step = 0;
    } else {
      console.log("USER	===> FALHA AO CADASTRAR");
      step = 0;
      await client.sendText(from, messages.submitError());
      return;
    }
  } else {
    console.log("USER	===> JÁ CADASTRADO");
    step = user.data?.step;
  }
  
  // ? Session proccess
  const lastMessage = new Date();
  await updateUserLastMessageTime(from, lastMessage);
  await expireSectionCountdown(from, lastMessage, client);
  
  // ? Steps proccess
  console.log("STEP	===>", step);
  const currentStep = steps[step as keyof typeof steps];
  if (currentStep) {
    await currentStep(client, message);
  } else {
    console.log(`PASSO INEXISTENTE`);
  }
}

async function expireSectionCountdown(
  from: ChatId,
  date: Date,
  client: Client
) {
  const expireTime = parseInt(process.env.EXPIRE_TIME || "120000"); // ? Padrão 2 minutos

  setTimeout(async () => {
    const user = await getUser(from);
    if (user.status !== 200 && user.status !== 404) {
      console.log("TIMEOUT	===> ERROR");
      return;
    }
    if (!user.data) {
      console.log("TIMEOUT	===> Usuário não encontrado");
      return;
    }
    console.log("TIMEOUT	===> Usuário encontrado");
    const lastMessage = new Date(user.data.lastMessageTime);
    if (lastMessage?.getTime() == date.getTime() && user.data.intervention) {
      console.log("TIMEOUT	===> Sessão expirada");
      await client.sendText(from, messages.sessionExpired());
      await updateUserStep(from, 0);
    } else {
      console.log("TIMEOUT	===> Sessão não expirada");
      return;
    }
  }, expireTime);
}
