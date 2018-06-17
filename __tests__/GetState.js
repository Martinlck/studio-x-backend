'use strict';
const ActionHero = require('actionhero');
const actionhero = new ActionHero.Process();
let api;
let userID;

describe('Save game state for user', () => {
    
    beforeAll(async () => { api = await actionhero.start() });
    afterAll(async () => { await actionhero.stop() });
    
    beforeEach(async () => {
        let response =  await api.specHelper.runAction('create_user', {name:"John"});
        userID = response.id;
        await api.specHelper.runAction('save_state', {userID:userID, gamesPlayed: 100, score: 10000});
    });
    test('should properly fetch game state from user', async  () => {
        let response = await api.specHelper.runAction('get_state', {userID:userID});
        expect(response.gamesPlayed).toEqual(100);
        expect(response.score).toEqual(10000);
    })
})
