# Studio X backend

Solution for the second case where we need a fast, robust and reliable REST service, ready to be used in a production environment for simple game.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have docker installed as the only dependency

### Installing

Building docker image

```
sh environment.sh init
```

Start stack

```
sh environment.sh start
```

Root endpoint will be:

```
http://localhost/api/
```

Stop stack

```
sh environment.sh stop
```

### Examples: 

Example usage : Create a user

```
POST http://localhost/api/user
```

Example usage: Put a game state:

* [Postman image](https://github.com/Martinlck/studio-x-backend/blob/master/PUT-gamestate.png)

Example usage: Put friends (Will only work if the userIDs sent exists):

* [Postman image](https://github.com/Martinlck/studio-x-backend/blob/master/PUT-friends.png)


## Running the integration tests

After starting the stack, log in to docker container

```
docker exec -it studio-x sh
```

Shut down the current cluster managed by our process manager pm2

```
pm2 stop all
```

Run full testsuite with database integration tests.

```
npm test
```

## Deployment

Deployment should work after CI runs the tests positively, and it should use kubernetes as our orchestrator.

When writing the configuration files for the services of k8s, we need to pass down the proper env variables to connect to the production google cloud datastore. 

## Built With

* [Actionhero](https://www.actionherojs.com/) - The framework used
* [Google cloud datastore](https://cloud.google.com/datastore/docs/) - Database of choice


## The reason behind the Framework

Actionhero is used by big companies like Riot Games, Samsung, Taskrabbit etc..
Open source contributions done to AH:

- Diagnosis : https://github.com/actionhero/actionhero/issues/1207
- Solution  : https://github.com/actionhero/actionhero/pull/1210

- Diagnosis : https://github.com/actionhero/actionhero/issues/1149
- Solution  : https://github.com/actionhero/actionhero/pull/1152

Helps writing clean code, for REST mapping and has full support from contributors, which makes the best choice for addressing a Case 2 of the exercise

## Code organization

Actions are mapped through the routes.js, found inside config directory. The routes also support dynamic parameters on URL as can be seen in the file.
Singleton pattern for the datastore connection.
Object oriented approach, having models like GameState and User created base on the data structure.
DB Integration tests and endpoint tests. 
Does not have HTTP tests as Action hero already comes with this tests on their build

## Data organization

For such simple data structures, we only use one kind which is Users.
Inside this kind we manage our User entities, which have attached a list of friends and a gamestate.
Since GameState is such a simple structure, it would not need a further entity to represent, but we still model it on our OOP approach.




