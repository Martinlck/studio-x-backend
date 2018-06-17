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
            users.push(u);
        }
        
        return users;
        
        
    }
}

module.exports = UserManager;