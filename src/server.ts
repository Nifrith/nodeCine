    import { config } from "dotenv"
    
    config();

    import { postgresDB } from 'databases/postgres-db';
    import {qaRouter} from 'routes/qa-routes';
    import {restRouter} from 'routes/rest-routes';
    import * as bodyParser from 'koa-bodyparser';
    const Sentry = require('@sentry/node');
    Sentry.init({ dsn: 'https://ab41c6282d2f41f889e6b7eeab54793f@sentry.io/1851434' });

    
    
    const app = require('./app');
    
    app.on('error', (err, ctx) => {
        Sentry.withScope(function(scope) {
          scope.addEventProcessor(function(event) {
            return Sentry.Handlers.parseRequest(event, ctx.request); 
          });
          Sentry.captureException(err);
        });
      });
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