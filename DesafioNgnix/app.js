import * as dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { loginUser, signupUser, serializeUser, deserializeUser } from "./src/models/users.js";
import { toSocketMessages, insertMessage } from './src/controllers/messages.controller.js';
import { toSocketProducts, insertProduct } from './src/controllers/products.controller.js';
import { auth } from './src/utils/authentication.js';
import { destroyCredentials } from './src/controllers/session.controller.js';
import { clearCache } from './src/utils/clearCache.js';
import { renderSystemInfo } from './src/controllers/app.controller.js';
import { UTIL_ROUTER } from './src/routers/util.router.js';
import { SIGNUP_ROUTER } from './src/routers/signup.router.js';
import { LOGIN_ROUTER } from './src/routers/login.router.js';

dotenv.config();

export function startServer(port) {
    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer);

    const PORT = port;
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    httpServer.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
    });

    httpServer.on("error", (error) => console.log("Error en servidor", error));

    app.use(
        session({
            secret: process.env.SECRETMONGO,
            saveUninitialized: false,
            resave: false,
            rolling: true,
            store: MongoStore.create({
                mongoUrl: process.env.MONGOURL,
                mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
                ttl: process.env.TTL,
            }),
            cookie: {
                maxAge: process.env.TTL * 1000,
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(clearCache);

    const loginStrat = new LocalStrategy(loginUser);
    const signupStrat = new LocalStrategy(signupUser);

    passport.use('login', loginStrat);
    passport.use('signup', signupStrat);
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.engine('handlebars', handlebars.engine());
    app.set('views', './views');
    app.set('view engine', 'handlebars');

    app.get("/", auth, (req, res) => { res.render('index', { script: 'main', user: req.user[0].username }) })
        .get('/logout', destroyCredentials)
        .get('/info', renderSystemInfo);

    app.use('/api', UTIL_ROUTER);
    app.use('/signup', SIGNUP_ROUTER);
    app.use('/login', LOGIN_ROUTER);

    io.on("connection", async (socket) => {
        let messages = await toSocketMessages();
        let products = await toSocketProducts();
        socket.emit("products", products);
        socket.on("newProduct", async (data) => {
            await insertProduct(data);
            products = await toSocketProducts();
            io.sockets.emit("products", products);
        });

        socket.emit("messages", messages);
        socket.on("newMessage", async (data) => {
            await insertMessage(data);
            messages = await toSocketMessages();
            io.sockets.emit("messages", messages);
        });
    });
}