import { BaseContext } from 'koa';
    import { getManager, Repository, Not, Equal } from 'typeorm';
    import { validate, ValidationError } from 'class-validator';
    import { movie } from 'models/movie';
    export default class movieController{
        public static async getMovies(ctx: BaseContext){
            const movieRepository: Repository<movie> = getManager().getRepository(movie);
            const movies: movie[] = await movieRepository.find();
            if(movies){
                ctx.status = 200;
                ctx.body = movies.map(({movieName, movieCategorie}) => {
                    return {
                        movieName,
                        movieCategorie
                    };
                });
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
            }else if(errors.length === 0 || ctx.body.length === 0){
                return ctx.res.noContent({ message: 'No content found' });
            }

        }

    }