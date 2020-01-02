    //routes/rest-routes.ts
    import * as Router from 'koa-router';
    import controller = require('controllers');
    export const restRouter = new Router();
    //Routes for the user entity
    restRouter.get('/users', controller.user.getUsers);             //Get all users in the database
    restRouter.get('/user/:email', controller.user.getUser);          //Get a single user by id
    restRouter.post('/user', controller.user.createUser);          //Create a single user in the database
    restRouter.put('/user/:email', controller.user.updateUser);       //Update a single user that matches the passed id
    restRouter.delete('/user/:email', controller.user.deleteUser);    //Delete a single user that matches the passed id

    restRouter.get('/movies', controller.movie.getMovies);   // Get all movies
    restRouter.post('/movie', controller.movie.createMovie);           // Register a new movie
    restRouter.post('/movie/:id', controller.movie.getMovie);           // Get a movie

    restRouter.get('/categories', controller.categorie.getCategories);              // Get all categories
    restRouter.post('/categorie', controller.categorie.createCategorie);   
    
    
    restRouter.get('/languages', controller.language.getLanguages);
    restRouter.get('/language/:id', controller.language.getLanguage);
    restRouter.post('/language', controller.language.createLanguage);
    restRouter.delete('/language/:id', controller.language.deleteLanguage);
    restRouter.put('/language/:id', controller.language.updateLanguage);// Register a new categorie