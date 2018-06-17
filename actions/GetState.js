'use strict';
const ActionHero = require('actionhero');
const {api} = require('actionhero');
const UserManager= require('managers/UserManager');

module.exports = class GetState extends ActionHero.Action {
    constructor () {
        super();
        this.name = 'get_state';
        this.description = 'stores a game state object for specific user';
    }
    
    outputExample () {
        return {
            game_state : {
            
            }
        }
    }
    
    inputs() {
        return {
            userID : {
                required: true
            }
        }
    }
    
    async run ({params, response}) {
        try {
            let userManager = new UserManager();
            
            let user =  await userManager.fetchUser(params.userID);
            
            response.game_state = user.game_state.toJSON();
        } catch (e) {
            response.error = e;
            api.log(e.message, "ERROR", e);
        }
        
    }
}
