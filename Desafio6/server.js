const express = require('express');
const {Server} = require('socket.io');
const path =  require('path');


const contenedorProd = require('./controllers/contenedorProductos');
const contenedorChat = require('./controllers/contenedorChat')


let containerProd = new contenedorProd('productos.txt');
let chatContainer = new contenedorChat('chat.txt');

const viewsFolder = path.join(__dirname,"views");

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>console.log(`Server Port ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"))


app.set("views", viewsFolder);

app.set("view engine", "ejs");

//Websocket

//Config websocket
const io = new Server(server);


//Detectar cada socket de un cliente que se conecte
io.on("connection", async(socket)=>{
    console.log("Nuevo cliente conectado");
    //Chat
    const chat = await chatContainer.getAll();
    socket.emit("messagesChat", chat);

    //Products
    const products = await containerProd.getAll();
    socket.emit("products", products);

    //Recibir msg
    socket.on("newMsg", async(data)=>{
        await chatContainer.save(data)
        //enviar los mensajes a todos los socket conecta2
        const chat = await chatContainer.getAll();
        io.sockets.emit("messagesChat", chat)
    })

    //Recibir Producto
    socket.on("newProduct", async(data)=>{
        await containerProd.save(data)
        //Enviar productos actualizados
        const products = await containerProd.getAll();
        io.sockets.emit("products", products)
    })
})

app.get('/', (req,res) => {
    res.render("home")
})