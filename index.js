// require your server and launch it here
const server = require('./api/server')

server.listen(1962, () => {
    console.log(`!!! server running on http://localhost:1962 !!!`)
})