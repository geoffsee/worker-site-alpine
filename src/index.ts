import {createYoga} from 'graphql-yoga';
import {IttyRouter} from 'itty-router'
import {buildSchemaForRequest} from "./graphql";

interface Env {
    ASSETS: Fetcher;
}

const api = IttyRouter();

// data api
api.all('/api/v1/graphql', async (request, env, ctx) => {
    const schema = buildSchemaForRequest<Env & ExecutionContext>();

    const yoga = createYoga<Env>({
        schema,
        graphqlEndpoint: '/api/v1/graphql', // GraphQL endpoint
    });

    return yoga.handleRequest(request, env);
});

// handles static assets
api.get('*', async (request, env, ctx) => {
    try {
        return env.ASSETS.fetch(request);
    } catch (error) {
        console.error('Error serving static asset:', error);
        return new Response('Asset not found', { status: 404 });
    }
});

export default api;