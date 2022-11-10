const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

class Contenedor{
    constructor(file){
        this.file = file
    }

    async getAll(){
        try{
            const data = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(data)
        } catch (error){
            console.log('Error in function getAll: ', error)
        }   
    }

    async save(product){
        try{
            const data = await fs.promises.readFile(this.file, 'utf-8')
            const products = JSON.parse(data)
            const lastId = products[products.length - 1].id
            const newProduct = { ...product, id: lastId + 1 }
            products.push(newProduct)
            await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2))
            console.log('A new product is created id: ' + newProduct.id)
        } catch (error){
            const newProduct = { ...product, id: 1 }
            await fs.promises.writeFile(this.file, JSON.stringify([newProduct], null, 2))
            console.log('A new product is created id: ' + newProduct.id)
        }
    }

    async getById(id) {
        try {
            const products = await this.getAll()
            const product = products.find((product) => product.id === id)
            if (!product) {
                console.log('null')
            } else {
                console.log('Product with id:', id, product)
            }
        } catch (error){
            throw new Error('A product with that id was not found')
        }
    }

    async deleteById(id) {
        try {
            const products = await this.getAll()
            const product = products.find((product) => product.id === id)
            if (!product) {
                throw new Error('A product with that id was not found')
            }
        } catch (error) {
            console.log('Error in deleteAll: ', error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([], null, 2))            
        } catch (error) {
            console.log('Error in deleteAll: ', error)
        }
    }
}

const contenedor = new Contenedor

app.get('./api/productos', async (req, res) => {
    const result = await contenedor.getAll()

    res.send(result)
})

app.post('./api/productos', async (req, res) => {
    const { newProduct } = req.body

    const result = await contenedor.save(newProduct)

    res.send(result)
})

app.listen(8080, () => {
    console.log('This server is listening')
})

