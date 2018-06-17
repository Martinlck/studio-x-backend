'use strict';
const ActionHero = require('actionhero');
const actionhero = new ActionHero.Process();
let api;
describe('Get all users from the game', () => {
    
    beforeAll(async () => { api = await actionhero.start() });
    afterAll(async () => { await actionhero.stop() });
    
    beforeEach(async () => {
        for (let i = 0; i < 10; i++)
            await api.specHelper.runAction('create_user', {name:"John" + i});
        
    });
    
    test('should properly retrieve all users from the game', async  () => {
        let response = await api.specHelper.runAction('get_all_users');
        expect(response.users.length).not.toBeLessThan(10); // we created many users with the previous tests
    })
})