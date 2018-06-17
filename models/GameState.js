class GameState {
    
    /**
     * If information is provided, it will use it for the current object. If not it will generate new data.
     * @param params
     */
    constructor(params) {
        if(!params) {
            this.gamesPlayed = 0;
            this.score = 0;
        } else {
            this.gamesPlayed = params.gamesPlayed
            this.score       = params.score;
        }
    }
    
    /**
     * Update function of the game score, It can also check if gamesPlayed is increasing as validation, but it was not added as not part of requirement
     * @param gamesPlayed
     * @param score
     */
    update(gamesPlayed, score) {
        
        if(score > this.score)
            this.score = score;
        
        this.gamesPlayed = gamesPlayed;
    }
    
    /**
     * Parsing function to get the JSON object needed.
     * @returns {{gamesPlayed: (number|*), score: (number|*)}}
     */
    toJSON() {
        return {
            gamesPlayed : this.gamesPlayed,
            score: this.score
        }
    }
}

module.exports = GameState;