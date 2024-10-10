import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt({
    rules: {
        'vue/multi-word-component-names': 'off'
    },
    ignores: [
        'dist',
        'node_modules'
    ]
})