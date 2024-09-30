

export default defineNitroPlugin((nitro) => {
nitro.hooks.hook('applicationinsights:trackRequest:before', (e,i) => {
    console.log(i)
})

})