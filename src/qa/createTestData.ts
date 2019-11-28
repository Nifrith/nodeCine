import { BaseContext } from 'koa';
import {getConnection} from "typeorm";
import { User } from 'models/user';
//Creating a class so we can later extend it to include creation of more test data
export class TestData {
    //This handles creating test users. Seperate functions can be added for other test data later.
    public static async createTestUsers(ctx: BaseContext){
    try {
    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
        { name: "Michael", email: "michael@osullivan.com", hashedPassword: "pass123" }, 
        { name: "Louise", email: "louise@osullivan.com", hashedPassword: "pass123" },
        { name: "Mary", email: "mary@osullivan.com", hashedPassword: "pass123" }
     ])
    .execute();
    //Return a success message if theer are no errors
    ctx.body = "Test users created successfully"
    
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