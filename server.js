const app = require('./app')

// STARTING SERVER
const port = 3000
app.listen(port, () => {
    console.log(`running on port ${port}`)
})
