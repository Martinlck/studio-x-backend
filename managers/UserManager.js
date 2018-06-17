const {api} = require('actionhero');

let User   = require('models/User');

class UserManager {
    
    constructor() {
    
    }
    
    async createUser(name) {
        let user = new User({
            name : name
        });
        
        let key  = User.generateKey(user.id);
        await api.datastore.saveAsync({
            key: key,
            data: user.toJSON()
        });
        
        return user;
    }
    
    async fetchUser(userID) {
        let key  = User.generateKey(userID);
        let userEntity = await api.datastore.getAsync(key);
        return new User(userEntity);
    }
    
    async saveUser(user) {
        let key  = User.generateKey(user.id);
        return api.datastore.saveAsync({
            key : key,
            data: user.toJSON()
        });
    }
    
    async fetchUsersInBatch(usersIds) {
        let users = [];
        
        let keys = [];
        
        for (let id of usersIds) {
            let key = User.generateKey(id);
            keys.push(key);
        }
        
        let resultSet = await api.datastore.getAsync(keys);
        
        for (let result of resultSet ) {
            let u = new User(result);
            // We can do this here so we dont loop through it again to sanitize
            // Also because the only places where we use this function is related to the friends and we follow the specs of example response.
            users.push({
                id : u.id,
                highscore: u.game_state.score,
                name: u.name
            });
        }
        
        return users;
    }
}

module.exports = UserManager;