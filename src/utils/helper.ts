import type {
  GenericMessageEvent,
  MessageEvent,
  ReactionAddedEvent,
  ReactionMessageItem,
} from '@slack/bolt';

export const isGenericMessageEvent = (msg: MessageEvent): msg is GenericMessageEvent =>
  (msg as GenericMessageEvent).subtype === undefined;

export const isMessageItem = (item: ReactionAddedEvent['item']): item is ReactionMessageItem =>
  (item as ReactionMessageItem).type === 'message';

export const getRandomSlackUserMentionFromText = (text: string): string => {
  const users = getSlackUserMentionsFromText(text);
  const random = Math.floor(Math.random() * users.length);

  return users[random] || '';
};

export const getSlackUserMentionsFromText = (text: string): string[] => {
  return text.match(/<@[a-zA-Z0-9_]+>/g) || [];
};

// ref: https://api.slack.com/enterprise/grid/developing#supporting-and-developing-apps-for-enterprise-grid__user-object-changes__user-ids
export const isSlackUserId = (str: string): boolean => {
  return !!str.match(/^(U|W)/);
};

export const isSlackTeamId = (str: string): boolean => {
  return !!str.match(/^T/);
};

export const isSlackGroupId = (str: string): boolean => {
  return !!str.match(/^S/);
};
