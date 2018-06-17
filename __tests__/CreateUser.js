'use strict'
const ActionHero = require('actionhero')
const actionhero = new ActionHero.Process()
let api

describe('creates a user', () => {
    
    beforeAll(async () => { api = await actionhero.start() })
    afterAll(async () => { await actionhero.stop() })
    
    test('should properly create a user and save it into DB', async  () => {
       let response =  await api.specHelper.runAction('create_user', {name:"John"});
       expect(response.user.id).not.toBe(undefined);
       expect(response.user.name).toEqual("John");
    })
})
