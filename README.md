# README

## Lightweight Full-Stack Starter Template

This repository provides a lightweight full-stack starter template using Alpine.js, Tailwind CSS, and Hono with GraphQL Yoga, all deployed on Cloudflare Workers. This stack ensures lightning-fast, globally distributed responses.

### Features
- **Frontend**: Alpine.js for reactivity and Tailwind CSS for styling.
- **Backend**: Hono framework with GraphQL Yoga.
- **Cloudflare Workers**: Serverless, fast, and globally distributed.

### Prerequisites
- npm or yarn
- Cloudflare account

### Installation
1. **Clone the repository:**
    ```sh
    git clone https://github.com/geoffsee/fullstack-starter-template.git
    cd fullstack-starter-template
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```
   or
    ```sh
    yarn install
    ```

3. **Configure Cloudflare Workers:**
    - Ensure you have `wrangler` installed and configured. Follow the Cloudflare Workers documentation: [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

### Usage
1. **Run the Development Server:**
    ```sh
    npm run dev
    ```
   or
    ```sh
    yarn dev
    ```
   Access the app at `http://localhost:8787`.

### Folder Structure
```
.
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── graphql.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── wrangler.toml
└── README.md
```

### Deployment
1. **Build the Project:**
    ```sh
    npm run build
    ```
   or
    ```sh
    yarn build
    ```

2. **Deploy to Cloudflare Workers:**
    ```sh
    wrangler publish
    ```

### License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.