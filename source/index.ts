import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { RegisterResolver } from './resolvers/user/Register';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './redis';
import cors from 'cors';
import { LoginResolver } from './resolvers/user/Login';
import { Context } from 'vm';
import { MeResolver } from './resolvers/user/Me';
import { ConfirmUserResolver } from './resolvers/user/ConfirmUser';
import { ForgotPasswordResolver } from './resolvers/user/ForgotPassword';
import { LogoutResolver } from './resolvers/user/Logout';
import { CreateUserResolver } from './resolvers/user/CreateUser';
import { CreateProductResolver } from './resolvers/product/CreateProduct';
import { ProfielPrictureResolver } from './resolvers/user/ProfilePicture';

const main = async (): Promise<void> => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [
            RegisterResolver, 
            LoginResolver, 
            MeResolver, 
            ConfirmUserResolver, 
            ForgotPasswordResolver, 
            LogoutResolver, 
            CreateUserResolver, 
            CreateProductResolver,
            ProfielPrictureResolver
        ]
    })
    
    const apolloServer = new ApolloServer({
        schema,
        context: ({req, res}):Context => ({req, res})
    });
    const app = Express();
    
    app.use(cors({credentials:true, origin:'http://localhost:3000'}))

    const RedisStore = connectRedis(session)
    app.use(session({
        store: new RedisStore({client: redis as any}),
        name: "rdscookie",
        secret: "SESSION_SECRET_COOKIE",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000*60*60*24*365*7
        },
    }));

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => console.log('server is running on localhost:4000/graphql'))
}


main();

'{"query":"mutation AddProfilePicture($picture: Upload!) {\n  addProfilePicture(picture: $picture)\n}"}'