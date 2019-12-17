    //controllers/user.ts
    import { BaseContext } from 'koa';
    import { getManager, Repository, Not, Equal } from 'typeorm';
    import { validate, ValidationError } from 'class-validator';
    import { User } from 'models/user';
    export default class UserController {
        public static async getUsers (ctx: BaseContext) {
            // get a user repository to perform operations with user
            const userRepository: Repository<User> = getManager().getRepository(User);
            // load all users
            const users: User[] = await userRepository.find();
            // return OK status code and loaded users array
            ctx.status = 200;
            ctx.body = users.map(({name, email}) => {
                return {
                    name,
                    email
                };
            });
        }
        public static async getUser (ctx: BaseContext) {
            // get a user repository to perform operations with user
            const userRepository: Repository<User> = getManager().getRepository(User);
            // load user by email
            const user: User = await userRepository.findOne({
                where: {
                    email: ctx.params.email
                }
            });
            if (user) {
                // return OK status code and loaded user object
                ctx.status = 200;
                ctx.body = user;
                ctx.message = ", Data found!";
            } else {
                // return a BAD REQUEST status code and error message
                ctx.status = 400;
                ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
            }
        }
        public static async createUser (ctx: BaseContext) {
            // get a user repository to perform operations with user
            const userRepository: Repository<User> = getManager().getRepository(User);
            
            // build up entity user to be saved
            const userToBeSaved: User = new User();
      
            userToBeSaved.name = ctx.request.body.name;
            userToBeSaved.email = ctx.request.body.email;
            userToBeSaved.hashedPassword = ctx.request.body.hashedPassword;
            //validate(ctx.request.body.name);
            // validate user entity
            const errors: ValidationError[] = await validate(userToBeSaved, { skipMissingProperties: true }); // errors is an array of validation errors
            if (errors.length > 0) {
                // return BAD REQUEST status code and errors array
                ctx.status = 400;
                ctx.body = errors;
            } else if ( await userRepository.findOne({ email: userToBeSaved.email}) ) {
                // return BAD REQUEST status code and email already exists error
                ctx.status = 400;
                ctx.body = 'The specified e-mail address already exists';
            } else {
                // save the user contained in the POST body
                const user = await userRepository.save(userToBeSaved);
                // return CREATED status code and updated user
                ctx.status = 201;
                ctx.body = user;
                ctx.message = "User registered sucesfully";
            }
        }
        public static async updateUser (ctx: BaseContext) {
            // get a user repository to perform operations with user
            const userRepository: Repository<User> = getManager().getRepository(User);
            // load the user by id
            const userToBeUpdated: User = await userRepository.findOne(ctx.params.id);
            // return a BAD REQUEST status code and error message if the user cannot be found
            if (!userToBeUpdated) {
                
                ctx.status = 400;
                ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';  
            } 
            if(ctx.request.body.name) {userToBeUpdated.name = ctx.request.body.name;}
            if(ctx.request.body.email) {userToBeUpdated.email = ctx.request.body.email;}
            if(ctx.request.body.hashedPassword) {userToBeUpdated.hashedPassword = ctx.request.body.hashedPassword;}
            // validate user entity
            const errors: ValidationError[] = await validate(userToBeUpdated); // errors is an array of validation errors
            if (errors.length > 0) {
                // return BAD REQUEST status code and errors array
                ctx.status = 400;
                ctx.body = errors;
            } else if ( !await userRepository.findOne(userToBeUpdated.id) ) {
                // check if a user with the specified id exists
                // return a BAD REQUEST status code and error message
                ctx.status = 400;
                ctx.body = 'The user you are trying to update doesn\'t exist in the db';
            } else if ( await userRepository.findOne({ id: Not(Equal(userToBeUpdated.id)) , email: userToBeUpdated.email}) ) {
                // return BAD REQUEST status code and email already exists error
                ctx.status = 400;
                ctx.body = 'The specified e-mail address already exists';
            } else {
                // save the user contained in the PUT body
                const user = await userRepository.save(userToBeUpdated);
                // return CREATED status code and updated user
                ctx.status = 201;
                ctx.body = user;
            }
        }
        public static async deleteUser (ctx: BaseContext) {
            // get a user repository to perform operations with user
            const userRepository: Repository<User> = getManager().getRepository(User);
            // load the user by id
            const userToRemove: User = await userRepository.findOne(ctx.params.id);
            if (!userToRemove) {
                // return a BAD REQUEST status code and error message
                ctx.status = 400;
                ctx.body = 'The user you are trying to delete doesn\'t exist in the db';
            } else {
                // the user is there so can be removed
                await userRepository.remove(userToRemove);
                // return a NO CONTENT status code
                ctx.status = 204;
            }
        }
      }