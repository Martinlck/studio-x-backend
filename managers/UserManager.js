const {api} = require('actionhero');

let User   = require('models/User');

class UserManager {
    
    constructor() {
    
    }
    
    /**
     * Asynchronous function which will create a new user with the given name
     * @param name
     * @returns {Promise.<User>}
     */
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
    
    /**
     * Asynchronous function which will fetch user by userID
     * @param userID
     * @returns {Promise.<User>}
     */
    async fetchUser(userID) {
        let key  = User.generateKey(userID);
        let userEntity = await api.datastore.getAsync(key);
        
        if(!userEntity)
            throw new Error("There is no user with ID: " + userID);
        
        return new User(userEntity);
    }
    
    /**
     * Async function which will save the user
     * @param user
     * @returns {Promise.<*>}
     */
    async saveUser(user) {
        let key  = User.generateKey(user.id);
        return api.datastore.saveAsync({
            key : key,
            data: user.toJSON()
        });
    }
    
    /**
     * Async function which will retrieve multiple users in batch.
     * It also sanitize the information for friend related API's (this function is only used for that case)
     * @param usersIds
     * @returns {Promise.<Array>}
     */
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
    
    /**
     * Optimized function to retrieve all users, I set 2 limit on purpose, to prove the optimization.
     * Of course if there are millions of users this solution would still not scale, and the way of doing this would be
     * sending the cursor hash to client, to be re-sent to retrieve more results.
     * So it would be paginated, and would apply a greater limit, let's say 100 users on each batch
     * @param cursor
     * @returns {Promise.<Array>}
     */
    async fetchAllUsers(cursor) {
        let query = api.datastore.createQuery('Users').limit(2);
    
        if(cursor !== undefined)
            query.start(cursor);
    
        let [entities, info] = await api.datastore.runQueryAsync(query);
        
        let users = [];
        
        for (let e of entities)
            users.push(new User(e));
        
        if (entities.length > 0) { // when no more results, we stop querying.
            let nextCursorUsers = await this.fetchAllUsers(info.endCursor);
            users = users.concat(nextCursorUsers);
        }
        
        return users;
    }
}

module.exports = UserManager;