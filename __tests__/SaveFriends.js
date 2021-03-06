'use strict';
const ActionHero = require('actionhero');
const actionhero = new ActionHero.Process();
const UserManager = require('managers/UserManager');
const uuidv4      = require('uuid/v4');
let api;
let mainUserID;
let friendIds = [];
describe('Save friends for the specific user', () => {
    
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
    });
    test('should properly save friends for the user', async  () => {
        await api.specHelper.runAction('save_friends', {userID:mainUserID, friends: friendIds});
        let userManager = new UserManager();
        let userUpdated = await userManager.fetchUser(mainUserID);
        expect(userUpdated.friends.length).toEqual(10);
    })
    
    test('should throw error when trying to save a user that does not exist', async  () => {
        let uuid = uuidv4();
        let friends = [uuid];
        let {error} = await api.specHelper.runAction('save_friends', {userID:mainUserID, friends: friends});
        expect(error).toEqual('Error: The friend list sent by client is not reliable, some client is not registered in the game');
    })
});