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
            this._newUser(params.name);
        else {
            this.id = params.id;
            this.name = params.name;
            this.game_state = new GameState(params.game_state);
            this.friends    = params.friends;
        }
    }
    
    /**
     * Private function that will start a new user, called only on constructor, should not be called anywhere else
     * _ at beginning of function name is convention of javascript for private functions
     * @param name
     * @private
     */
    _newUser(name) {
        if(!name)
            throw new Error("Cant create a new user without a name");
        this.id = uuidv4();
        this.game_state = new GameState();
        this.friends = [];
        this.name = name;
    }
    
    /**
     * Function which will do simple validation of friends and update the value;
     * @param friends
     */
    updateFriends(friends) {
        
        if (!Array.isArray(friends))
            throw new Error("Argument sent is not an array");
        
        this.friends = friends;
    }
    
    /**
     * Interfaced function from user to call the update function on game state.
     * @param gameState
     */
    updateGameState(gameState) {
        this.game_state.update(gameState.gamesPlayed, gameState.score);
    }
    
    /**
     * Static function to generate a key on Users kind to fetch or save the user.
     * @param id
     * @returns {Key}
     */
   static generateKey(id) {
        return api.datastore.key(['Users', id]);
    }
    
    /**
     * Function which will clean the object and receive JSON object.
     * @returns {{name: *, id: *, game_state: {gamesPlayed: (number|*), score: (number|*)}, friends: (*|Array)}}
     */
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