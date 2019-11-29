import { BaseContext } from 'koa';
    import { getManager, Repository, Not, Equal } from 'typeorm';
    import { validate, ValidationError } from 'class-validator';
    import { movieCategorie } from 'models/movieCategorie';
    export default class categorieController{
        public static async getCategories(ctx: BaseContext){
            const movieCatRepository: Repository<movieCategorie> = getManager().getRepository(movieCategorie);
            const movieCategories: movieCategorie[] = await movieCatRepository.find();
            if(movieCategories.length){
                ctx.status = 200;
                ctx.body = movieCategories.map(({categorie}) => {
                    return {
                        categorie
                    };
                });
            } else {
                ctx.status = 204;
                ctx.body = '';
                ctx.message = 'no content';
            }
        }

        public static async createCategorie(ctx: BaseContext){
            // get a movie repository to perform operation with movies
            const movieCatRepository: Repository<movieCategorie> = getManager().getRepository(movieCategorie);

            // build up entity movieCategorie to be saved
            const categorieToBeSaved: movieCategorie = new movieCategorie();

            categorieToBeSaved.categorie = ctx.request.body.categorie;

            const errors: ValidationError[] = await validate(categorieToBeSaved, { skipMissingProperties: true});
            if(errors.length > 0){
                ctx.status = 400;
                ctx.body = errors;
            } else if ( await movieCatRepository.findOne({ categorie: categorieToBeSaved.categorie}) ) {
                // return BAD REQUEST status code and categorie already exists error
                ctx.status = 400;
                ctx.body = 'The specified categorie already exists';
            } else {
                // save the user contained in the POST body
                const user = await movieCatRepository.save(categorieToBeSaved);
                // return CREATED status code and updated user
                ctx.status = 201;
                ctx.body = user;
                ctx.message = "Success";
            }

        }

    }