import type { SayArguments } from '@slack/bolt';
import { getRandomSlackUserMentionFromText } from '../utils/helper';

export const appMentionService = (text: string): SayArguments => {
  const userMention = getRandomSlackUserMentionFromText(text);

  return {
    text: `The user is ${userMention}!`,
  };
};
