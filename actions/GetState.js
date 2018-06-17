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
            gamesPlayed: 10,
            score: 100000
        }
    }
    
    inputs() {
        return {
            userID : {
                required: true
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
            let user =  await userManager.fetchUser(params.userID);
            let jsonObject = user.game_state.toJSON();
            response.gamesPlayed = jsonObject.gamesPlayed;
            response.score = jsonObject.score;
        } catch (e) {
            response.error = e;
            api.log(e.message, "ERROR", e);
        }
        
    }
}
