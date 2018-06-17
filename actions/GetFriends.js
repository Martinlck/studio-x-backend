'use strict';
const ActionHero = require('actionhero');
const {api} = require('actionhero');
const UserManager= require('managers/UserManager');

module.exports = class GetFriends extends ActionHero.Action {
    constructor () {
        super();
        this.name = 'get_friends';
        this.description = 'retrieves the friends from specific user';
    }
    
    outputExample () {
        return {
            friends : [
                {
                    id : "e06400dd-c48a-4760-96c3-35fcfbe9baac",
                    name: "John",
                    highscore:10000
                },
                {
                    id : "e06400ee-c48a-4760-96c3-35fcfbe9baac",
                    name: "Marta",
                    highscore:1000
                },
                {
                    id : "e06400ff-c48a-4760-96c3-35fcfbe9baac",
                    name: "Martin",
                    highscore:30000
                }
            ]
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
            let user  = await userManager.fetchUser(params.userID);
            // This is very fast since we do in a single I/O call with the key access.
            response.friends = await userManager.fetchUsersInBatch(user.friends)
        } catch (e) {
            response.error = e;
            api.log(e.message, "ERROR", e);
        }
        
    }
}
