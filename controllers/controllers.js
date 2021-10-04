// const { FavsSchema } = require('../db/mongodb/mongodbSchema')
const UserModel = require('../db/mongodb/mongodbSchema')

function resJson(res,err,data){
    if(err) res.json({"success":false,"data":err})
    else if(!data) res.json({"success":false,"data":{"message":"Data Not Found"}})
    else res.json({"success":true,"data":data})
  }

async function getRoot(req, res){
    res.status(200).send({"message": "controllers running"})
}

async function findFavorites(req, res){
    try {
        const { email } = req.body
        console.log("email", email)
        const response = await UserModel.find({email}).lean().exec()
        console.log("getFavorites response",response)
        resJson(res,false,response)
    }
    catch ( e ){
        console.error(`Error getFavorites: ${e.message}`)
    }
}

async function addFavorites(req, res){
    try {
        const { email, movie_id, coll } = req.body
        console.log("coll", coll)
        const response = await UserModel.find({email}).exec()
        
        if ( (response.length) ){
            // const rem_movie = await UserModel.find({email:email, favorites:movie_id}).exec()
            let rem_movie = null
            if ( coll ) rem_movie = await UserModel.find({email:email, favorites:movie_id}).exec()
            else rem_movie = await UserModel.find({email:email, later:movie_id}).exec()
            
            if ( (rem_movie.length) ){
                // const rm_movie = await UserModel.updateOne({email}, { '$pull': { 'favorites': movie_id } })
                let rm_movie = null
                if ( coll ) rm_movie = await UserModel.updateOne({email}, { '$pull': { 'favorites': movie_id } })
                else rm_movie = await UserModel.updateOne({email}, { '$pull': { 'later': movie_id } })
                resJson(res, false, rm_movie)
            }
            else {
                // const update = await UserModel.updateOne({email}, { '$addToSet': { 'favorites': movie_id } })
                let update = null
                if ( coll ) update = await UserModel.updateOne({email}, { '$addToSet': { 'favorites': movie_id } })
                else update = await UserModel.updateOne({email}, { '$addToSet': { 'later': movie_id } })
                resJson(res, false, update)
            }
        }
        else {
            // const creation = await UserModel.create({ email, "favorites":movie_id })
            let creation = null
            if ( coll ) creation = await UserModel.create({ email, 'favorites':movie_id })
            else creation = await await UserModel.create({ email, 'later':movie_id })
            const saving = await creation.save()
            resJson(res, false, saving)
        }
    }
    catch ( e ) {
        console.error(`Error postFavorites: ${e.message}`)
    }
}


module.exports = {
    getRoot,
    findFavorites,
    addFavorites,
}