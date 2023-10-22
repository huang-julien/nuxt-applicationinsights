<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# nuxt-applicationinsights

(Microsoft Application Insight)[https://learn.microsoft.com/fr-fr/azure/azure-monitor/app/app-insights-overview?tabs=net] integration for Nuxt 3.

<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- (nitro-applicationinsights)[https://github.com/huang-julien/nitro-applicationinsights] integration
- (@microsoft/applicationinsights-web)[https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwikrM-2somCAxU0RqQEHbTkBBMQFnoECBMQAQ&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40microsoft%2Fapplicationinsights-web&usg=AOvVaw0YBh7uJXG97fkuIACO0LBh&opi=89978449] integration

## Quick Setup

1. Add `nuxt-applicationinsights` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-applicationinsights

# Using yarn
yarn add --dev nuxt-applicationinsights

# Using npm
npm install --save-dev nuxt-applicationinsights
```

2. Add `nuxt-applicationinsights` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-applicationinsights'
  ]
})
```

That's it! You can now use `nuxt-applicationinsights` in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/my-module/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/my-module

[npm-downloads-src]: https://img.shields.io/npm/dm/my-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/my-module

[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/my-module

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
