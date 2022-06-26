/* eslint-disable no-console */
/* eslint-disable import/no-internal-modules */
import './utils/env';
import { App, LogLevel, ExpressReceiver } from '@slack/bolt';
import { isGenericMessageEvent } from './utils/helper';
import { appMentionService } from './services/appMention';
import {
  deleteInstallation,
  getInstallation,
  storeInstallation,
} from './services/slackInstallations';

const receiver = new ExpressReceiver({ signingSecret: process.env['SLACK_SIGNING_SECRET'] as string });

// @ts-ignore
const app = new App({
  token: process.env['SLACK_BOT_TOKEN'],
  signingSecret: process.env['SLACK_SIGNING_SECRET'],
  logLevel: LogLevel.DEBUG,
  receiver,
  installationStore: {
    storeInstallation: async (installation) => {
      // Bolt will pass your handler an installation object
      // Change the lines below so they save to your database
      if (
        installation.isEnterpriseInstall &&
        installation.enterprise !== undefined
      ) {
        // handle storing org-wide app installation
        await storeInstallation(installation.enterprise.id, installation);
        return;
      }
      if (installation.team !== undefined) {
        // single team app installation
        await storeInstallation(installation.team.id, installation);
        return;
      }
      throw new Error('Failed saving installation data to installationStore');
    },
    fetchInstallation: async (installQuery) => {
      // Bolt will pass your handler an installQuery object
      // Change the lines below so they fetch from your database
      if (
        installQuery.isEnterpriseInstall &&
        installQuery.enterpriseId !== undefined
      ) {
        // handle org wide app installation lookup
        return await getInstallation(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation lookup
        return await getInstallation(installQuery.teamId);
      }
      throw new Error('Failed fetching installation');
    },
    deleteInstallation: async (installQuery) => {
      // Bolt will pass your handler  an installQuery object
      // Change the lines below so they delete from your database
      if (
        installQuery.isEnterpriseInstall &&
        installQuery.enterpriseId !== undefined
      ) {
        // org wide app installation deletion
        await deleteInstallation(installQuery.enterpriseId);
        return;
      }
      if (installQuery.teamId !== undefined) {
        // single team app installation deletion
        await deleteInstallation(installQuery.teamId);
        return;
      }
      throw new Error('Failed to delete installation');
    },
  },
});

app.use(async ({ next }) => {
  await next!();
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  if (!isGenericMessageEvent(message)) return;

  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there <@${message.user}>!`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me',
          },
          action_id: 'button_click',
        },
      },
    ],
    text: `Hey there <@${message.type}>!`,
  });
});

// need app_mentions:read and chat:write scopes
app.event('app_mention', async ({ event, say }) => {
  try {
    await say(appMentionService(event.text));
  } catch (error) {
    console.error(error);
  }
});

app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});


receiver.router.get('/ping', (_req, res) => {
  // You're working with an express req and res now.
  res.send('yay!');
});

(async () => {
  // Start your app
  const port = Number(process.env['PORT']) || 3000;
  await app.start(port);

  console.log(process.env['SLACK_SIGNING_SECRET'])
  console.log(`⚡️ Bolt app is running! port: ${port}`);
})();
