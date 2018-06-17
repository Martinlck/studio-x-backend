exports['default'] = {
    routes: (api) => {
        return {
            post: [
                {path: '/user', action: 'create_user'}
            ],
            
            get: [
                {path: '/user/:userID/state', action: 'get_state'},
                {path: '/user/:userID/friends', action: 'get_friends'},
                {path: '/user', action: 'get_all_users'}
            ],
            
            put: [
                {path: '/user/:userID/state', action: 'save_state'},
                {path: '/user/:userID/friends', action: 'save_friends'}
            ]
        }
    }
}
