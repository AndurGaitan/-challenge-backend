import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Product {
        id: ID!,
        title: String!,
        price: Float!,
        thumbnail: String!
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
        save(product: ProductInput): Int
        update(id: ID!,product: ProductInput): Product
        delete(id: ID!): Int
    }`
);