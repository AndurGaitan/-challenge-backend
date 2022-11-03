const fs = require('fs')

function generarId(info) {
    let listaNum = info.map(({ id }) => id)
    return listaNum.includes(listaNum.length + 1) ? (Math.max(...listaNum)) : (listaNum.length + 1)
}

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo
    }
    async save(producto) {//obj
        try {
            let id = await fs.promises.readFile(this.archivo, "utf-8")
                .then(data => {
                    if (data == "") {
                        data = "[]"
                    }
                    let info = JSON.parse(data)
                    producto.id = generarId(info)
                    info.push(producto)
                    fs.watchFile(this.archivo, JSON.stringify(info, null, 2), (err) => {
                        if (err) {
                            throw new Error(err);
                        }
                    })
                    return producto.id
                })
                .then(id => id)
                .catch()
            return id
        } catch (err) {
            console.log(err);
        }
    }
    async getById(num) {
        try {
            let item = await fs.promises.readFile(this.archivo, "utf-8")
                .then(data => {
                    let info = JSON.parse(data)
                    return info.find(producto.id === num)
                })
                .then(producto => producto);
            return item
        }
        catch (err) {
            console.log("error en la lectura del archivo:" + err)
        }
    }

    async getAll() {
        try {
            let lista = await this.getAll()
            //fs.promises.readFile(this.archivo, "utf-8")
                .then(data => {
                    let info = JSON.parse(data)
                    return info
                })
        }
        catch (err) {
            return []
        }
    }

    async deleteById(num) {
        try {
            fs.promises.readFile(this.archivo, "utf-8")
                .then(data => {
                    let info = JSON.parse(data)
                    fs.writeFile(this.archivo, JSON.stringify(info.filter(producto => producto.id != num), null, 2), (err) => {
                        if (err) {
                            throw new Error(err);
                        }
                    })
                })
        } catch (error) {
            console.log("Error al borra el archivo" + error);
        }
    }
};

async function ejecutar(){

const c1 = new Contenedor("productos.txt");

let id = await c1.save({nombre: "galletas", precio: "diez"})

let info = await c1.getAll()

console.log(info)

await c1.deleteById(id)

} 

ejecutar()