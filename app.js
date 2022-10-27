class Username {
    constructor(name, surname){
        this.name = name
        this.surname = surname
        this.book = []
        this.pet = []
    }

    getFullName(){
        return `Su nombre es: ${this.name} ${this.surname}`
    }

    addPet(mascota){
         this.pet.push(mascota)
    }

    countPet(){
        return this.pet.length
    }

    addBooks(name, autor){
        this.book.push({name: name, autor: autor})    
    }

    getBookNames(){
        let bookSelect = []
        this.book.map(function(element){
           bookSelect.push(element.name)
        })
        console.log(bookSelect)
     }
}

const carlos = new Username("carlos","corbalan")
console.log(carlos.addPet("yuli"))
console.log(carlos.addPet("trini"))
console.log(carlos.addPet("lara"))
console.log(carlos.addBooks("Cien años de soledad", "Gabriel Garcia Marquez"))
console.log(carlos.addBooks("El principito", "Antoine de Saint"))
console.log(carlos.addBooks("Como hacer que te pasen cosas buenas", "Marian Rojas"))
console.log(carlos.getFullName())
console.log(carlos.countPet())
console.log(carlos.getBookNames())  

