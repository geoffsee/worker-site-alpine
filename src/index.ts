import {Hono} from 'hono';
import {serveStatic} from 'hono/cloudflare-workers';
import {createYoga} from 'graphql-yoga';

// @ts-ignore | @manifest | This variable is only available at build/run time
import manifest from '__STATIC_CONTENT_MANIFEST';
import {buildSchemaForRequest} from "./graphql";

/**
 * Interface representing the bindings for the KVNamespace and other potential bindings.
 */
interface Bindings extends Record<string, any> {
    STORAGE: KVNamespace;
}

const api = new Hono<{ Bindings: Bindings }>();

/**
 * Serves static files from the root directory.
 *
 * @param {Context} ctx - The context object.
 */
api.get('/', serveStatic({root: './', manifest}));

/**
 * Serves static files from the 'static' directory.
 *
 * @param {Context} ctx - The context object.
 */
api.get('/static/*', serveStatic({root: './', manifest}));

/**
 * Serves the favicon.ico file.
 *
 * @param {Context} ctx - The context object.
 */
api.get('/favicon.ico', serveStatic({path: './favicon.ico', manifest}));

/**
 * Middleware for handling GraphQL requests.
 *
 * @param {Context} ctx - The context object.
 * @returns {Promise<Response>} - The response from the GraphQL Yoga handler.
 */
api.use('/api/v1/graphql', async (ctx) => {
    // Build the schema for the incoming request
    const schema = buildSchemaForRequest<Bindings & ExecutionContext>();

    // Create a new instance of Yoga GraphQL server
    const yoga = createYoga<Bindings>({
        schema,
        graphqlEndpoint: '/api/v1/graphql', // GraphQL endpoint
    });

    // Handle the request using Yoga GraphQL handler
    return yoga.handleRequest(ctx.req.raw, ctx.env);
});

export default api;
