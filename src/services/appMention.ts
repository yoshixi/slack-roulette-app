import type { SayArguments } from '@slack/bolt';
import { getRandomSlackUserMentionFromText } from '../utils/helper';

export const appMentionService = (text: string): SayArguments => {
  const textWithoutBotId = text.replace(/<@[a-zA-Z0-9_]+>/, '')
  const userMention = getRandomSlackUserMentionFromText(textWithoutBotId);

  return {
    text: `The user is ${userMention}!`,
  };
};
