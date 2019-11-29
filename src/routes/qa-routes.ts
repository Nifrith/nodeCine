import * as Router from 'koa-router';
import createTestData = require('qa/createTestData');
import createMovieCategorie = require('qa/createMovieCategories');
import createMovieData = require('qa/createMovieData');
export const qaRouter = new Router();
//Routes for the user entity
qaRouter.post('/qa/users', createTestData.TestData.createTestUsers);  //Create some test users
qaRouter.post('/qa/categories', createMovieCategorie.TestData.createCategories);  //Create some test users
qaRouter.post('/qa/movies', createMovieData.TestData.createMovies);         