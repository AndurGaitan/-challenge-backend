import { productsRepo } from "../persistence/repos/products.repo.js";
import { fakeProds } from "../utils/application/fakeData.js";


const persistence = new productsRepo();

persistence.createTable();

export default class ProductsService {

    constructor() {
        this.persistence = persistence
    }

    getAllProducts = async () => {
        return await this.persistence.getAll();
    }

    insertProduct = async (product) => {
        if(product.product) product = product.product
        return await this.persistence.save(product);
    }

    getProductById = async (id) => {
        if (typeof id == 'object') id = id.id
        return await this.persistence.getProductById(id);
    }

    updateProduct = async (id, data) => {
        return await this.persistence.updateProduct(id, data);
    }

    deleteProduct = async (id) => {
        if (typeof id == 'object') id = id.id
        return await this.persistence.deleteProduct(id);
    }

    fakeProducts = (req) => {
        let cant = req.query.cant || 5;
        let products = [];
        for (let i = 0; i < cant; i++) {
            let prod = fakeProds();
            products.push(prod);
        }
        return products
    }

    updateProductQL = async ({id, product}) => {
        return await this.updateProduct(id, product);
    }
}
