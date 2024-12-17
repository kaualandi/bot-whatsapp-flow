import {
  Client,
  ConfigObject,
  NotificationLanguage,
} from '@open-wa/wa-automate';

export class OptionsConfig {
  private headless: boolean;
  private startCallback: (client: Client) => Promise<void>;

  constructor(
    headless: boolean,
    startCallback: (client: Client) => Promise<void>
  ) {
    this.headless = headless;
    this.startCallback = startCallback;
  }

  public getConfig(): ConfigObject {
    return {
      blockCrashLogs: false,
      disableSpins: false,
      hostNotificationLang: NotificationLanguage.PTBR,
      logConsole: false,
      viewport: {
        width: 1920,
        height: 1200,
      },
      popup: 3012,
      multiDevice: true,
      defaultViewport: null,
      sessionId: 'bot-whatsapp-flow',
      headless: this.headless,
      qrTimeout: 0,
      authTimeout: 60,
      restartOnCrash: this.startCallback,
      cacheEnabled: true,
      useChrome: true,
      killProcessOnBrowserClose: true,
      throwErrorOnTosBlock: true,
    };
  }
}
