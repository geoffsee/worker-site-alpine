import {createSchema} from "graphql-yoga";
import {getRandomSweetNothing} from "./service";

export function buildSchemaForRequest<T>() {
    const schema = createSchema<T>({
        typeDefs: `
    type Query {
      whisperSweetNothing: String
    }
  `,
        resolvers: {
            Query: {
                whisperSweetNothing: () => getRandomSweetNothing()
            }
        }
    });
    return schema;
}