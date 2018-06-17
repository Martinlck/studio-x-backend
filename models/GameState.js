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
    
    update(gamesPlayed, score) {
        
        if(score > this.score)
            this.score = score;
        
        this.gamesPlayed = gamesPlayed;
    }
    
    toJSON() {
        return {
            gamesPlayed : this.gamesPlayed,
            score: this.score
        }
    }
}

module.exports = GameState;