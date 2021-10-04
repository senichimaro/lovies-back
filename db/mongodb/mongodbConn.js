const mongoose = require('mongoose')

mongoose.connection.on('open', () => console.log("db connected"))

async function mongodbConn( host ){
    try {
        await mongoose.connect(
            `${host}`,
            {useNewUrlParser: true, useUnifiedTopology: true}
            )
    }
    catch( e ){
        console.error(`Error in mongodbConn: ${e.message}`)
    }
}

module.exports = mongodbConn