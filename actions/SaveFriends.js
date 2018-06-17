'use strict';
const ActionHero = require('actionhero');
const {api} = require('actionhero');
const UserManager= require('managers/UserManager');

module.exports = class SaveFriends extends ActionHero.Action {
    constructor () {
        super();
        this.name = 'save_friends';
        this.description = 'stores the friends from the user';
    }
    
    outputExample () {
        return {
        }
    }
    
    inputs() {
        return {
            userID : {
                required: true
            },
            friends : {
                required: true,
            }
        }
    }
    
    /**
     * Function which will be running when this particular request hits
     * @param params
     * @param response
     * @returns {Promise.<void>}
     */
    async run ({params, response}) {
        try {
            let userManager = new UserManager();
            
            let user  = await userManager.fetchUser(params.userID);
            
            // This is very fast since we do in a single I/O call with the key access.
            let friends = await userManager.fetchUsersInBatch(params.friends)
            
            if(friends.length !== params.friends.length)
                throw new Error("The friend list sent by client is not reliable, some client is not registered in the game");
            
            // can safely modify this value in memory, without using ACID on datastore because nobody else touches this information making it impossible ot have multiple requests racing
            // for other cases, we can use acid updates through their query api system. But the API definition from front end, sends the updated values already.
            
            user.updateFriends(params.friends);
            
            await userManager.saveUser(user);
        } catch (e) {
            response.error = e;
            api.log(e.message, "ERROR", e);
        }
        
    }
}
