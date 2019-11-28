import * as Router from 'koa-router';
import createTestData = require('qa/createTestData');
export const qaRouter = new Router();
//Routes for the user entity
qaRouter.post('/qa/users', createTestData.TestData.createTestUsers);          //Create some test users