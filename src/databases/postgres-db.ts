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
           host     : 'localhost',
           port     :  5432,
           username : 'usuariopg',
           password : 'Josue2500',
           database : 'koacine',
           ssl: true,
           entities: postgresTables,
           logging: ['query', 'error'],
           synchronize: true,
       }).then((connection) => {
           console.log('Database connection established');
           
       });


   };