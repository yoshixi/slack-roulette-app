"use strict";
exports.__esModule = true;
var helper_1 = require("../../src/utils/helper");
describe('getRandomSlackUserMentionFromText', function () {
    var users = ['<@UAKK7UH8U>', '<@UAKB7UH8U>', '<@UAKB0UH8U>'];
    test('return user contained users', function () {
        var result = (0, helper_1.getRandomSlackUserMentionFromText)(users.join(' '));
        expect(users.findIndex(function (el) { return el === result; })).toBeGreaterThanOrEqual(0);
    });
});
describe('getUsersFromText', function () {
    var users = ['<@UAKK7UH8U>', '<@UAKB7UH8U>', '<@UAKB0UH8U>'];
    test('return users array', function () {
        expect((0, helper_1.getSlackUserMentionsFromText)(users.join(' ')).sort()).toEqual(users.sort());
    });
});
// Slack api object type can be checked. https://api.slack.com/types
describe('isSlackUserId', function () {
    test('When given slack user_id, it returns true', function () {
        expect((0, helper_1.isSlackUserId)('U0KK7UH8U')).toBe(true);
        expect((0, helper_1.isSlackUserId)('W0KK7UH8U')).toBe(true);
    });
    test('When given value that is not slack user_id, it returns true', function () {
        expect((0, helper_1.isSlackUserId)('S0KK7UH8U')).toBe(false);
    });
});
describe('isSlackTeamId', function () {
    test('When given slack user_id, it returns true', function () {
        expect((0, helper_1.isSlackTeamId)('T0KK7UH8U')).toBe(true);
    });
    test('When given value that is not slack user_id, it returns true', function () {
        expect((0, helper_1.isSlackTeamId)('S0KK7UH8U')).toBe(false);
    });
});
describe('isSlackGroupId', function () {
    test('When given slack group_id, it returns true', function () {
        expect((0, helper_1.isSlackGroupId)('S0KK7UH8U')).toBe(true);
    });
    test('When given value that is not slack group_id, it returns false', function () {
        expect((0, helper_1.isSlackGroupId)('U0KK7UH8U')).toBe(false);
    });
});
