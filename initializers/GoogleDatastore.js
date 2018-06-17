'use strict';
const {Initializer, api} = require('actionhero');
const Bluebird           = require('bluebird');

// We import the data store
const Datastore = require('@google-cloud/datastore');

// Our Google Cloud Platform project ID
const projectId = 'ah';

class DataStore extends Initializer {
    
    constructor() {
        super();
        this.loadPriority = 1001;
        this.startPriority = 1001;
        this.stopPriority = 1001;
        this.name = "Datastore";
    }
    
    /**
     * Method which will be called at the beginning of the server creation.
     */
    async initialize() {
        
        // We make the datastore instance a singleton.
        api.datastore = new Datastore({
            projectId: projectId,
        });
        
        let saveAsync = Bluebird.promisify(api.datastore.save); // We promisify the functions we will use, to use latest nodejs v8 engine updates
        let getAsync  = Bluebird.promisify(api.datastore.get);
        let deleteAsync  = Bluebird.promisify(api.datastore.delete);
        let runQueryAsync = Bluebird.promisify(api.datastore.runQuery, {multiArgs: true});
        // we safely re-assign the promisified functions to their name with Async suffix
        api.datastore.saveAsync = saveAsync;
        api.datastore.getAsync  = getAsync;
        api.datastore.runQueryAsync = runQueryAsync;
        api.datastore.deleteAsync = deleteAsync;
    }
    
    /**
     * Method which will be called after all initialize had been executed for all initializers.
     */
    async start() {}
    
    /**
     * Method which will be called when server is gracefully shutdown
     */
    async stop() {}
}

module.exports = DataStore;