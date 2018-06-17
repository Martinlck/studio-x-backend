'use strict';
const ActionHero = require('actionhero');
const UserManager = require('managers/UserManager');
const actionhero = new ActionHero.Process();
let api;
let user;

describe('Save game state for user', () => {
    
    beforeAll(async () => { api = await actionhero.start() });
    afterAll(async () => { await actionhero.stop() });
    
    beforeEach(async () => {
        user =  await api.specHelper.runAction('create_user', {name:"John"});
    });
    test('should properly store game state to user', async  () => {
        await api.specHelper.runAction('save_state', {userID:user.id, gamesPlayed: 10, score: 1000});
        let manager = new UserManager();
        let userToValidate = await manager.fetchUser(user.id);
        expect(userToValidate.game_state.gamesPlayed).toEqual(10);
        expect(userToValidate.game_state.score).toEqual(1000);
    });
    
    
    test('should not replace score if is lower than the previously saved', async  () => {
        await api.specHelper.runAction('save_state', {userID:user.id, gamesPlayed: 10, score: 1000});
        await api.specHelper.runAction('save_state', {userID:user.id, gamesPlayed: 11, score: 300});
        let manager = new UserManager();
        let userToValidate = await manager.fetchUser(user.id);
        expect(userToValidate.game_state.gamesPlayed).toEqual(11);
        expect(userToValidate.game_state.score).toEqual(1000);
    })
});
