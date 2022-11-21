const express = require('express')

const handlebars = require('express-handlebars')

const app = express()

const productos = []

app.engine('handlebars', handlebars.engine())

app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.set('view', '/view')

app.set('view engine', 'ejs')

//GET   
app.get('/', (req, res) => {
    res.render('inicio', {productos})    
})

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
})

const server = app.listen(8080, () => {
    console.log('This server is listening')
})