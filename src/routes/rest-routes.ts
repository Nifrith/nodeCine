    //routes/rest-routes.ts
    import * as Router from 'koa-router';
    import controller = require('controllers');
    export const restRouter = new Router();
    //Routes for the user entity
    restRouter.get('/users', controller.user.getUsers);             //Get all users in the database
    restRouter.get('/users/:email', controller.user.getUser);          //Get a single user by id
    restRouter.post('/users', controller.user.createUser);          //Create a single user in the database
    restRouter.put('/users/:email', controller.user.updateUser);       //Update a single user that matches the passed id
    restRouter.delete('/users/:email', controller.user.deleteUser);    //Delete a single user that matches the passed id

    restRouter.get('/movies', controller.movie.getMovies); // Get all movies
    restRouter.post('/movies', controller.movie.createMovie); // Register a new movie