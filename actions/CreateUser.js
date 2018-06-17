'use strict';
const ActionHero = require('actionhero');
const {api} = require('actionhero');
// User manager require
const UserManager= require('managers/UserManager');

module.exports = class CreateUser extends ActionHero.Action {
    constructor () {
        super();
        this.name = 'create_user';
        this.description = 'creates a new user in the game';
    }
    
    /**
     * Shows example of response
     */
    outputExample () {
        return {
            id : "18dd75e9-3d4a-48e2-bafc-3c8f95a8f0d1",
            name : "John"
        }
    }
    
    /**
     *  Inputs required to run this request
      * @returns {{name: {required: boolean}}}
     */
    inputs() {
        return {
            name : {
                required: true
            },
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
            let user =  await userManager.createUser(params.name);
            response.id = user.id;
            response.name = user.name;
        } catch (e) {
            response.error = e;
            api.log(e.message, "ERROR", e);
        }
        
    }
}
