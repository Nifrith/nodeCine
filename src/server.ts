    //server.ts
    import { postgresDB } from 'databases/postgres-db';
    import {qaRouter} from 'routes/qa-routes';
    import {restRouter} from 'routes/rest-routes';
    import * as bodyParser from 'koa-bodyparser';
    var app = require('./app');
    const bootstrap = async () => {
        // Initialize the database
        await postgresDB();
         // Enable bodyParser which is needed to work with information
        // passed to the server from the client requests 
        app.use(bodyParser());
        //Tell our application to use the router we have created to handle routes related to testing
        app.use(qaRouter.routes(), qaRouter.allowedMethods())
        //Tell our application to use the router we have created to handle routes for our rest api
        app.use(restRouter.routes(), restRouter.allowedMethods())
        //Tell the app to listen on port 3000
        app.listen(3000);
    };
    bootstrap();