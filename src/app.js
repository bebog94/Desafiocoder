import express from 'express'
import sessionsRouter from "./routes/sessions.router.js";
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import { __dirname } from "./utils.js";
import session from "express-session";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import "./passport.js";
import messageRouter from "./routes/messages.router.js"
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { errorMiddleware } from './middleware/error.middleware.js';


//DB
import "./DAL/dao/db/configDB.js"



dotenv.config();
const { PORT, MONGODB_URI } = process.env;

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    store: new MongoStore({
      mongoUrl: MONGODB_URI,
    }),
    secret: "secretSession",
    cookie: { maxAge: 60000 },
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());




app.engine('handlebars', engine({
  defaultLayout: "main",
  runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
  }
}));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


// routes
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)
app.use('/api/messages', messageRouter);
app.use("/", viewsRouter); 
app.use(errorMiddleware)


//localhost
const httpServer = app.listen(PORT, () => {
  console.log("Escuchando al puerto 8080");
});


const socketServer = new Server(httpServer);
const messages = [];
socketServer.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);
  socket.on("newUser", (user) => {
    socket.broadcast.emit("userConnected", user);
    socket.emit("connected");
  });
  socket.on("message", (infoMessage) => {
    messages.push(infoMessage);
    socketServer.emit("chat", messages);
  });
});



