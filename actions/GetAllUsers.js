'use strict';
const ActionHero = require('actionhero');
const {api} = require('actionhero');
const UserManager= require('managers/UserManager');

module.exports = class GetAllUsers extends ActionHero.Action {
    constructor () {
        super();
        this.name = 'get_all_users';
        this.description = 'retrieves all the users from the game';
    }
    
    /**
     * Shows example of response
     */
    outputExample () {
        return {
            users : [
                {
                    id : "e06400dd-c48a-4760-96c3-35fcfbe9baac",
                    name: "John",
                },
                {
                    id : "e06400ee-c48a-4760-96c3-35fcfbe9baac",
                    name: "Marta",
                },
                {
                    id : "e06400ff-c48a-4760-96c3-35fcfbe9baac",
                    name: "Martin",
                }
            ]
        }
    }
    
    /**
     * Required inputs to run this request
     * @returns {{}}
     */
    inputs() {
        return {
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
            response.users = await userManager.fetchAllUsers();
        } catch (e) {
            response.error = e;
            api.log(e.message, "ERROR", e);
        }
        
    }
}
