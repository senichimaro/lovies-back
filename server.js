const app = require('./app')
const mongodbConn = require('./db/mongodb/mongodbConn')
const { dbConfig } = require('./config')


const port = process.env.PORT || 3001
async function appInit( port, app, dbConfig ){
    try {
        await mongodbConn( dbConfig )
        await app.listen(port, () => console.log(`listen: ${port}`))
    }
    catch ( e ){
        console.error(`Error appInit: ${e.message}`)
    }
}

appInit(port, app, dbConfig)