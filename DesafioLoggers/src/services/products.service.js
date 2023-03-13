import { productsContainer } from "../persistence/containers/products.container.js";
import { options } from "../options/mysql.options.js";
import { fakeProds } from "../utils/fakeData.js";


const bd = new productsContainer(options, 'products');

bd.createTable();

const toSocketProducts =  async () => {
    return await bd.getAll();
}

const insertProduct = async (product) => {
    await bd.save(product);
}

const fakeProducts = (req) => {
    let cant = req.query.cant || 5;
    let products = [];
    for (let i = 0; i < cant; i++) {
        let prod = fakeProds();
        products.push(prod);
    }
    console.log(products)
    return products
}


export default{
    toSocketProducts,
    insertProduct,
    fakeProducts
};