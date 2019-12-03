    //postgres-db.ts
    /*
    This file initializes your PostgreSQL database. You need to supply
    the host name, username, password and database name for your database.
    */
   import { createConnection } from 'typeorm';
   import { postgresTables } from './postgres-tables'

   export const postgresDB = async () => {
       return await createConnection({
           type     : 'postgres',
           host     : process.env.DB_HOST,
           port     : Number(process.env.DB_PORT),
           username : process.env.DB_USERNAME,
           password : process.env.DB_PASSWORD,
           database : process.env.DB_DATABASE,
           ssl: true,
           entities: postgresTables,
           logging: ['query', 'error'],
           synchronize: true,
       }).then((connection) => {
           console.log('Database connection established');
           
       });


   };