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
        userID = response.user.id;
        await api.specHelper.runAction('save_state', {userID:userID, gamesPlayed: 100, score: 10000});
    });
    test('should properly fetch game state from user', async  () => {
        let response = await api.specHelper.runAction('get_state', {userID:userID});
        let gameState = response.game_state;
        expect(gameState.gamesPlayed).toEqual(100);
        expect(gameState.score).toEqual(10000);
    })
})
