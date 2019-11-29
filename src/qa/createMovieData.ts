import { BaseContext } from 'koa';
import {getConnection} from "typeorm";
import { movie } from 'models/movie';
import { movieCategorie} from 'models/movieCategorie'
//Creating a class so we can later extend it to include creation of more test data
export class TestData {
    //This handles creating test users. Seperate functions can be added for other test data later.
    public static async createMovies(ctx: BaseContext){
    try {
    const categorie = await getConnection()
    .getRepository(movieCategorie)
    .createQueryBuilder("movieCategorie")
    .where("movieCategorie.categorie = :categorie", {categorie: 'Adventure'})
    .getOne()

    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(movie)
    .values([
        { movieName: "Spirited Away", movieCategorie: categorie.id.toString}
     ])
    .execute();
    //Return a success message if theer are no errors
    ctx.body = "Test movies created successfully"
    
    //Catch any errors and return a 500 error status to the user is there are errors
    }catch (err) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
        message: err.message
    };
    }
}
};