const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const db = require('./config/db')

// import routes
const routes = require('./routes/index')

// Start app
const app = express()
// Set server port to listen
const PORT = 3333;

// Start database
    (async () => {
        try {
            await db.sync()
            console.log('Database created successfully')
        } catch (err) {
            console.log(err)
        }
    })()


// MIDDELWARES
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

// ROUTES
app.use(routes)

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`))