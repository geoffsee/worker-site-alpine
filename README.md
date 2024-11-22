# worker-site-alpine

> A lightweight full-stack starter template featuring Alpine.js, Tailwind CSS, and GraphQL Yoga on Cloudflare Workers.

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Cloudflare Workers](https://img.shields.io/badge/cloudflare-workers-orange)
![Alpine.js](https://img.shields.io/badge/Alpine.js-latest-blue)

## Overview

`worker-site-alpine` is a modern full-stack template that demonstrates the integration of Alpine.js reactivity with GraphQL on Cloudflare's edge network. It showcases a whimsical "sweet nothings" generator while providing a foundation for building performant, globally distributed web applications. 

### Key Features

- **Edge Computing**: Leverage Cloudflare Workers for globally distributed deployment
- **GraphQL Integration**: Built-in GraphQL Yoga implementation with itty-router
- **Modern Frontend**: Alpine.js reactivity with Tailwind CSS styling
- **Asset Handling**: Built-in static asset serving capabilities
- **TypeScript Support**: Full TypeScript support across the stack
- **Developer Experience**: Hot reload and easy deployment workflow

### _Try it_

```bash
npx wrangler@latest init my-app --template https://github.com/geoffsee/worker-site-alpine
```
## Installation

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

## Quick Start

```typescript
import { createYoga } from 'graphql-yoga';
import { IttyRouter } from 'itty-router';
import { buildSchemaForRequest } from './graphql';

const api = IttyRouter();
api.all('/api/v1/graphql', async (request, env, ctx) => {
    const schema = buildSchemaForRequest();
    const yoga = createYoga({
        schema,
        graphqlEndpoint: '/api/v1/graphql',
    });
    return yoga.handleRequest(request, env);
});
```

## Core Components

### GraphQL Schema

The GraphQL layer provides a simple, extensible API for data operations.

```typescript
export function buildSchemaForRequest() {
    return createSchema({
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
}
```

### Frontend Integration

Alpine.js handles frontend reactivity with minimal overhead.

```html
<div x-data="appData()">
    <button
        @click="fetchSweetNothing"
        class="px-4 py-2 bg-[#164e63] text-white rounded">
        whisper sweet nothings
    </button>
    <p x-text="sweetNothing"></p>
</div>
```

### Routing

itty-router provides lightweight routing with Cloudflare Workers compatibility.

```typescript
api.get('*', async (request, env, ctx) => {
    try {
        return env.ASSETS.fetch(request);
    } catch (error) {
        return new Response('Asset not found', { status: 404 });
    }
});
```

## Complete Example

Here's a comprehensive example demonstrating the full stack:

```typescript
// Frontend (Alpine.js)
function appData() {
    return {
        sweetNothing: '',
        async fetchSweetNothing() {
            const response = await fetch('/api/v1/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `{ whisperSweetNothing }`
                }),
            });
            const result = await response.json();
            this.sweetNothing = `"${result.data.whisperSweetNothing}"`;
        }
    }
}

// Backend (GraphQL + Workers)
interface Env {
    ASSETS: Fetcher;
}

const api = IttyRouter();
api.all('/api/v1/graphql', async (request, env, ctx) => {
    const schema = buildSchemaForRequest<Env & ExecutionContext>();
    const yoga = createYoga<Env>({
        schema,
        graphqlEndpoint: '/api/v1/graphql',
    });
    return yoga.handleRequest(request, env);
});

export default api;
```

## Asset Handling

The template includes built-in asset handling through Cloudflare Workers:

```typescript
api.get('*', async (request, env, ctx) => {
    try {
        return env.ASSETS.fetch(request);
    } catch (error) {
        return new Response('Asset not found', { status: 404 });
    }
});
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## Development

```bash
# Install dependencies
npm install

# Run development mode
npm run dev

# Deploy to Cloudflare Workers
npm run deploy

# Format code
npm run format
```

## License
MIT © 2024 Geoff Seemueller