import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt({
    rules: {
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/unified-signatures': 'off',
    },
}).prepend({
    // `ignores` is only a global ignore when it is the sole key of its config object
    ignores: [
        'dist',
        'node_modules',
        'playground',
        'docs',
    ]
})