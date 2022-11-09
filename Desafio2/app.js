const fs = require('fs')

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

const main = async () => {
    const contenedor = new Contenedor('productos.txt')
    await contenedor.save({
        title: 'Galletas',
        price: 350.50,
        thumbnail: 'https://d320djwtwnl5uo.cloudfront.net/recetas/cover_c2qdn6zjl4_iStock-497833586_galletas_garbanzo_choco.jpg'
    })
    await contenedor.save({
        title: 'Pan',
        price: 250.50,
        thumbnail: 'https://thumbs.dreamstime.com/b/pan-largo-del-pan-22826883.jpg'
    })
    await contenedor.save({
        title: 'Tortillas',
        price: 150.50,
        thumbnail: 'https://ultracongeladoscanalsenses.com.ar/wp-content/uploads/2020/01/TortillasTucumanas-copia.jpg'
    })    

    const id = 3
    await contenedor.getById(id)
    const products = await contenedor.getAll()
    console.log('Array of objects', products)
    await contenedor.deleteById(2)
    //await contenedor.deleteAll()
}

main()