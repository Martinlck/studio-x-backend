'use strict';
const ActionHero = require('actionhero');
const {api} = require('actionhero');
const UserManager= require('managers/UserManager');
const GameState  = require('models/GameState');

module.exports = class SaveState extends ActionHero.Action {
    constructor () {
        super();
        this.name = 'save_state';
        this.description = 'stores a game state object for specific user';
    }
    
    outputExample () {
        return {
            result: "OK"
        }
    }
    
    inputs() {
        return {
            userID : {
                required: true
            },
            gamesPlayed: {
                required : true
            },
            score : {
                required: true
            }
        }
    }
    
    async run ({params, response}) {
        try {
            
            let userManager = new UserManager();
            
            let user =  await userManager.fetchUser(params.userID);
            
            let newGameState = new GameState({
                gamesPlayed : params.gamesPlayed,
                score : params.score
            });
            
            // can safely modify this value in memory, without using ACID on datastore because nobody else touches this information making it impossible ot have multiple requests racing
            // for other cases, we can use acid updates through their query api system. But the API definition from front end, sends the updated values already.
            user.updateGameState(newGameState);
            
            await userManager.saveUser(user);
        } catch (e) {
            response.error = e;
            api.log(e.message, "ERROR", e);
        }
        
    }
}
