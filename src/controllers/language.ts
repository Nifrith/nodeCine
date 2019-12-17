import { BaseContext } from 'koa';
    import { getManager, Repository, Not, Equal, Connection, getRepository,createQueryBuilder } from 'typeorm';
    import { validate, ValidationError } from 'class-validator';
    import { language } from 'models/language';

    export default class languageController{

        public static async createLanguage(ctx: BaseContext){
            // get a language repository to perform operations with language
            const languagerepo: Repository<language> = getManager().getRepository(language);
            // build new language entity to be saved
            const languageToBeSaved: language = new language();
            
            languageToBeSaved.language = ctx.request.body.language;
            //validate ctx.request.body fields

            // errors is an array of validation errors
            const errors: ValidationError[] = await validate(languageToBeSaved, { skipMissingProperties: true });

            if (errors.length){
                //return bad request status code and errors array
                ctx.status= 400;
                ctx.body = errors;
            } else if (await languagerepo.findOne({language: languageToBeSaved.language})){
                //return bad request status code if language already exists on database
                ctx.status = 400;
                ctx.body = 'The specified movie language already exists';
            } else {
                const language = await languagerepo.save(languageToBeSaved);
                // return created status code and created language
                ctx.status = 201;
                ctx.body = language;
                ctx.message = "Language registered succesfully"
            }
        }

        public static async getLanguages (ctx: BaseContext){
            // get a language repository to perform operations with user
            const languagerepo: Repository<language> = getManager().getRepository(language);
            //load all languages
            const languages: language[] = await languagerepo.find();
            // return OK status code and loaded users array
            ctx.status = 200;
            ctx.body = languages;
        }

        public static async getLanguage (ctx: BaseContext){
          // get a language repository to work with
          
          const languagerepo: Repository<language> = getManager().getRepository(language);
          //load language by id
          const language: language = await languagerepo.findOne({
                where:{
                    id: ctx.params.id
                }
          });

          if (language) {
              // return OK status code and loaded language object
              ctx.satus = 200;
              ctx.body = language;
              ctx.message = ", Language Found!"
          } else {
             // return a bad request status code and error message
             ctx.status = 400;
             ctx.body = 'The language you are trying to retrieve doesnt\'t exists in the db';
          }

        }

        public static async updateLanguage (ctx: BaseContext){
            // get a language repository to perform operations with
            const languagerepo: Repository<language> = getManager().getRepository(language);
            // load the language by id
            const languageToBeUpdated: language = await languagerepo.findOne(ctx.params.id);
            // return a bad request status code and error message if language to be updated doesn't exists
            if (!languageToBeUpdated) {
                ctx.status = 400;
                ctx.body = 'The language you are trying to retrieve doesn\'t exist in the db'
            }
            if(ctx.request.body.language){languageToBeUpdated.language = ctx.request.body.language;}

            // validate language entity
            const errors: ValidationError[] = await validate(languageToBeUpdated);
            if (errors.length) {
                // return bad request status code and errors array
                ctx.status = 400;
                ctx.body = errors;
            } else if  (!await languagerepo.findOne(languageToBeUpdated.id)){
                //check if a language with a specified id exists
                // return a bad request status code and error message
                ctx.status = 400;
                ctx.body = 'Language you are trying to update doesn\'t exists';
            } else {
                // save the language contained in the put body
                const language = await languagerepo.save(languageToBeUpdated);
                // return created status code and updated user
                ctx.status = 201;
                ctx.body = language;
            }
        }

        public static async deleteLanguage (ctx: BaseContext){
            // get a language repository to work with
            const languagerepo: Repository<language> = getManager().getRepository(language);
            //load the language by id
            const languageToRemove: language = await languagerepo.findOne(ctx.params.id);
            if (!languageToRemove) {
                //return a bad request status code and error message
                ctx.status = 400;
                ctx.body = 'The language you are trying to delete doesn\'t exists';
            } else {
                // the language is created, so can be removed
                await languagerepo.remove(languageToRemove);
                // return a No Content status code
                ctx.status = 204;
                ctx.body = `Language with id: ${ctx.params.id} has been removed` 
            }
        }








    }
    