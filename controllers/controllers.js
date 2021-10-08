const axios = require('axios')

const UserModel = require('../db/mongodb/mongodbSchema')

function resJson(res,err,data){
  res.header("Access-Control-Allow-Origin", '*');
    if(err) res.json({"success":false,"data":err})
    else if(!data) res.json({"success":false,"data":{"message":"Data Not Found"}})
    else res.json({"success":true,data})
  }

async function getRoot(req, res){
    res.status(200).send({"message": "controllers running"})
}

async function findCollection(req, res){
    try {
        const { email } = req.body
        const response = await UserModel.find({email}).lean().exec()
        resJson(res,false,response[0])
    }
    catch ( e ){
        console.error(`Error findFavorites: ${e.message}`)
    }
}

async function addFavorites(req, res){
    try {
        const { email, movie_id, coll } = req.body
        const response = await UserModel.find({email}).exec()

        const find_movie = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        let movie_res = await axios(find_movie)
        let movie_data = {
            backdrop_path: movie_res.data.backdrop_path,
            genres: movie_res.data.genres,
            id: movie_res.data.id,
            original_title: movie_res.data.original_title,
            overview: movie_res.data.overview,
            poster_path: movie_res.data.poster_path,
        }
        movie_res = JSON.stringify( movie_data )

        if ( (response.length) ){
            let rem_movie = null
            if ( coll ) rem_movie = await UserModel.find({email:email, favorites:movie_res}).exec()
            else rem_movie = await UserModel.find({email:email, later:movie_res}).exec()

            if ( (rem_movie.length) ){
                let rm_movie = null
                if ( coll ) rm_movie = await UserModel.updateOne({email}, { '$pull': { 'favorites': movie_res } })
                else rm_movie = await UserModel.updateOne({email}, { '$pull': { 'later': movie_res } })
                resJson(res, false, rm_movie)
            }
            else {
                let update = null
                if ( coll ) update = await UserModel.updateOne({email}, { '$addToSet': { 'favorites': movie_res } })
                else update = await UserModel.updateOne({email}, { '$addToSet': { 'later': movie_res } })
                resJson(res, false, update)
            }
        }
        else {
            let creation = null
            if ( coll ) creation = await UserModel.create({ email, 'favorites': movie_res })
            else creation = await await UserModel.create({ email, 'later': movie_res })
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
    findCollection,
    addFavorites,
}
