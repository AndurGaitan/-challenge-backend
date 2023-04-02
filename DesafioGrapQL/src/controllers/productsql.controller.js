import ProductsService from "../services/products.service.js";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Product {
        id: ID!,
        title: String!,
        price: Float!,
        thumbnail: String!
    }
    type Response {
        error: Int,
        message: String
    }
    input ProductInput {
        title: String!,
        price: Float!,
        thumbnail: String!
    }
    type Query {
        getAll: [Product]
        getById(id: ID!): [Product]
    }
    type Mutation {
        save(product: ProductInput): [Product]
        update(id: ID!, product: ProductInput): [Product]
        delete(id: ID!): Response
    }`
);

export default class GraphQLController {
    constructor() {
        const productsService = new ProductsService();
        return graphqlHTTP({
            schema: schema,
            rootValue: {
                getAll: productsService.getAllProducts,
                getById: productsService.getProductById,
                save: productsService.insertProduct,
                update: productsService.updateProductQL,
                delete: productsService.deleteProduct
            },
            graphiql: true
        })
    }
}