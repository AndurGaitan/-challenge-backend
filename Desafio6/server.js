const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = HttpServer(app)
const io = new IOServer(httpServer)


const productos = []

app.use(express.static('./views'))

app.set('view engine', 'ejs')



const mensajes = []

io.on('connection', socket =>{
    console.log('Un cliente se ha conectado')

    socket.emit('messages', mensajes)

    socket.on('new-message', data => {
        mensajes.push(data)

        io.sockets.emit('messages', mensajes)
    })
})

//GET
app.get('/', (req, res) => {
    res.render('inicio', {productos})    
})

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
}) 

const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
