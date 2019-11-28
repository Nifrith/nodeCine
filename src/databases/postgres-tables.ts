    //postrgestables.ts
    /*
    This file simply imports our models and creates an array with a list of
    the tables we want to include when we connect to Postgres. Its overkill to
    keep this info in a seperate file when we only have one table but it will be
    really neat and clean once our app grows to have tens and hundreds of tables
    */
   import { User } from 'models/user';
   import {movieCategorie} from 'models/movieCategorie';
   import {movie} from 'models/movie';
   import {cinema} from 'models/cinema';
   import {language} from 'models/language';
   export const postgresTables = [User,movieCategorie, movie, cinema, language]