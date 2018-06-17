'use strict';
const {Initializer, api} = require('actionhero');
const Bluebird           = require('bluebird');

// We import the data store
const Datastore = require('@google-cloud/datastore');

Bluebird.promisifyAll(Datastore);

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
    
    async initialize() {
        
        // We make the datastore instance a singleton.
        api.datastore = new Datastore({
            projectId: projectId,
        });
       //
       //  const key = api.datastore.key(['Company', 'Google']);
       //
       //  const data = {
       //      name: 'Google',
       //      location: 'CA'
       //  };
       //
       //  await api.datastore.saveAsync({
       //      key: key,
       //      data: data
       //  });
       //
       //
       // let entity = await api.datastore.getAsync(key);
       //
       //  console.log("entity ", entity);
    
    }
    
    /**
     * Method which will be called after all initialize had been executed for all initializers.
     */
    async start() {}
    
    /**
     * Method which will be called when server is gracefully shut down
     */
    async stop() {}
}

module.exports = DataStore;