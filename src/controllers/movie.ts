import { BaseContext } from 'koa';
    import { getManager, Repository, Not, Equal, Connection, getRepository,createQueryBuilder } from 'typeorm';
    import { validate, ValidationError } from 'class-validator';
    import { movie } from 'models/movie';
import { categorie } from 'controllers';
    export default class movieController{
        public static async getMovies(ctx: BaseContext){
            const movieRepository: Repository<movie> = getManager().getRepository(movie);
            const movies: movie[] = await movieRepository.find();
            if(movies.length){
                ctx.status = 200;
                ctx.body = movies.map(({movieName, movieCategorie}) => {
                    return {
                        movieName,
                        movieCategorie
                    };
                });
            } else {
                ctx.status = 204;
                ctx.body = '';
                ctx.message = 'no content';
            }
        }

        public static async createMovie(ctx: BaseContext){
            // get a movie repository to perform operation with movies
            const movieRepository: Repository<movie> = getManager().getRepository(movie);

            // build up entity movie to be saved
            const movieToBeSaved: movie = new movie();

            movieToBeSaved.movieName = ctx.request.body.movieName;
            movieToBeSaved.movieCategorie = ctx.request.body.movieCategorie;

            const errors: ValidationError[] = await validate(movieToBeSaved, { skipMissingProperties: true});
            if(errors.length > 0){
                ctx.status = 400;
                ctx.body = errors;
            } else if ( await movieRepository.findOne({ movieName: movieToBeSaved.movieName}) ) {
                // return BAD REQUEST status code and movie already exists error
                ctx.status = 400;
                ctx.body = 'The specified movie already exists';
            } else {
                console.log(movieToBeSaved);
                const user = await movieRepository.save(movieToBeSaved);
                // return CREATED status code and updated user
                ctx.status = 201;
                ctx.body = user;
                ctx.message = "Success";
            }

        }

        public static async getMovie (ctx: BaseContext) {
            // get a user repository to perform operations with user
            const movieRepository: Repository<movie> = getManager().getRepository(movie);
            // load user by email
            const movies: movie = await movieRepository.findOne({
                where: {
                    id: ctx.params.id
                }
            });
            if (movies) {
                // return OK status code and loaded user object
                ctx.status = 200;
                ctx.body = movies;
                ctx.message = ", Data found!";
            } else {
                // return a BAD REQUEST status code and error message
                ctx.status = 400;
                ctx.body = 'The movie you are trying to retrieve doesn\'t exist in the db';
            }
        }

    }