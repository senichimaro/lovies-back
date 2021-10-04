const mongoose = require('mongoose')

// const UserSchema = mongoose.Schema({
//     email: {type: String}
// })
// const UserModel = mongoose.model('UserSchema', UserSchema)

const FavsSchema = mongoose.Schema({
    email: {type: String},
    movie_id: [String]
})
const FavsModel = mongoose.model('FavsSchema', FavsSchema)

const LaterSchema = mongoose.Schema({
    email: {type: String},
    movie_id: [String]
})
const LaterModel = mongoose.model('LaterSchema', LaterSchema)


// module.exports = {
    //     UserModel,
    //     FavsModel,
    //     LaterModel,
    // }
    
const UserSchema = mongoose.Schema({
    email: {type: String},
    favorites: [String],
    later: [String]
})
module.exports = mongoose.model('UserSchema', UserSchema)