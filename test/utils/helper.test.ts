import { getRandomSlackUserMentionFromText, getSlackUserMentionsFromText, isSlackUserId, isSlackGroupId, isSlackTeamId } from '../../src/utils/helper';

describe('getRandomSlackUserMentionFromText', () =>{
  const users = ['<@UAKK7UH8U>', '<@UAKB7UH8U>', '<@UAKB0UH8U>'];
  test('return user contained users', ()=>{
    const result = getRandomSlackUserMentionFromText(users.join(' '))

    expect(users.findIndex((el) => el === result)).toBeGreaterThanOrEqual(0);
  })
})

describe('getUsersFromText', () =>{
  const users = ['<@UAKK7UH8U>', '<@UAKB7UH8U>', '<@UAKB0UH8U>'];

  test('return users array', ()=>{
    expect(getSlackUserMentionsFromText(users.join(' ')).sort()).toEqual(users.sort());
  })
})

// Slack api object type can be checked. https://api.slack.com/types
describe('isSlackUserId', () => {
  test('When given slack user_id, it returns true', () => {
    expect(isSlackUserId('U0KK7UH8U')).toBe(true);
    expect(isSlackUserId('W0KK7UH8U')).toBe(true);
  })

  test('When given value that is not slack user_id, it returns true', () => {
    expect(isSlackUserId('S0KK7UH8U')).toBe(false);
  })
 })

describe('isSlackTeamId', () => {
  test('When given slack user_id, it returns true', () => {
    expect(isSlackTeamId('T0KK7UH8U')).toBe(true);
  })

  test('When given value that is not slack user_id, it returns true', () => {
    expect(isSlackTeamId('S0KK7UH8U')).toBe(false);
  })
 })

describe('isSlackGroupId', () => {
  test('When given slack group_id, it returns true', () => {
    expect(isSlackGroupId('S0KK7UH8U')).toBe(true);
  })

  test('When given value that is not slack group_id, it returns false', () => {
    expect(isSlackGroupId('U0KK7UH8U')).toBe(false);
  })
 })
