'use strict';
const ActionHero = require('actionhero');
const {api} = require('actionhero');
const UserManager= require('managers/UserManager');

module.exports = class GetState extends ActionHero.Action {
    constructor () {
        super();
        this.name = 'get_state';
        this.description = 'retrieves game state for specific user';
    }
    
    outputExample () {
        return {
            game_state : {
                gamesPlayed: 10,
                score: 100000
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
