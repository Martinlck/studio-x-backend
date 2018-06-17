const uuidv4 = require('uuid/v4');
const {api} = require('actionhero');
const GameState = require('models/GameState');

class User {
    
    /**
     * If information is provided, it will use it for the current object. If not it will generate new data.
     * @param params
     */
    constructor(params) {
        if(!params.id)
            this.newUser(params.name);
        else {
            this.id = params.id;
            this.name = params.name;
            this.game_state = new GameState(params.game_state);
            this.friends    = params.friends;
        }
    }
    
    newUser(name) {
        if(!name)
            throw new Error("Cant create a new user without a name");
        this.id = uuidv4();
        this.game_state = new GameState();
        this.friends = [];
        this.name = name;
    }
    
    updateFriends(friends) {
        
        if (!Array.isArray(friends))
            throw new Error("Argument sent is not an array");
        
        this.friends = friends;
    }
    
    updateGameState(gameState) {
        this.game_state.update(gameState.gamesPlayed, gameState.score);
    }
    
   static generateKey(id) {
        return api.datastore.key(['Users', id]);
    }
    
    toJSON() {
        return {
            name : this.name,
            id : this.id,
            game_state: this.game_state.toJSON(),
            friends: this.friends
        }
    }
}

module.exports = User;