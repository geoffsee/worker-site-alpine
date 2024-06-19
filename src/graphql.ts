import {createSchema} from "graphql-yoga";

export function buildSchemaForRequest<T>() {
    const schema = createSchema<T>({
        typeDefs: /* GraphQL */ `
    type Query {
      hello: String
    }
  `,
        resolvers: {
            Query: {
                hello: () => 'world'
            }
        }
    });
    return schema;
}