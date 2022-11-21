const express = require('express')

const app = express()

const productos = []

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//app.set('view', '/views');
app.set('view engine', 'pug');

//GET
app.get('/', (req, res) => {
    res.render('formulario', {productos})    
})

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
})

const server = app.listen(8080, () => {
    console.log('This server is listening')
})