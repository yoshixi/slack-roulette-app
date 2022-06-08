import type { SayArguments } from '@slack/bolt';
import { getRandomSlackUserMentionsFromText } from '../utils/helper';

export const appMentionService = (text: string): SayArguments => {
  const userMention =  getRandomSlackUserMentionsFromText(text)

  return {
    text: `The user is ${userMention}!`,
  };
}
