const express = require('express')

const handlebars = require('express-handlebars')

const app = express()


app.engine('handlebars', handlebars.engine())

app.set('views', './views')

app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productos = []


//GET   

app.get('/', (req, res) => {
    res.render('datos', {productos})    
})

//POST

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
})

const server = app.listen(8080, () => {
    console.log('This server is listening')
})