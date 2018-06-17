'use strict';
const ActionHero = require('actionhero');
const actionhero = new ActionHero.Process();
let api;
let mainUserID;
let friendIds = [];
let validationMap = {};
describe('Get friends for the specific user', () => {
    
    beforeAll(async () => { api = await actionhero.start() });
    afterAll(async () => { await actionhero.stop() });
    
    beforeEach(async () => {
        for (let i = 0; i < 10; i++) {
            let response =  await api.specHelper.runAction('create_user', {name:"John" + i});
            let userID = response.id;
            friendIds.push(userID);
        }
        let response =  await api.specHelper.runAction('create_user', {name:"John"});
        mainUserID = response.id;
        await api.specHelper.runAction('save_friends', {userID:mainUserID, friends: friendIds});
        for (let i = 0; i < friendIds.length; i++) {
            let friendId = friendIds[i];
            let score = i * 100;
            await api.specHelper.runAction('save_state', {userID:friendId, gamesPlayed: i * 10, score: score });
            validationMap[friendId] = score;
        }
    });
    
    test('should properly fetch user friends', async  () => {
        let response = await api.specHelper.runAction('get_friends', {userID:mainUserID});
        expect(response.friends.length).toEqual(10);
        for (let friend of response.friends) {
            expect(friend.id).not.toBe(undefined);
            expect(friend.name).not.toBe(undefined);
            expect(friend.highscore).toEqual(validationMap[friend.id]);
        }
    })
    
});