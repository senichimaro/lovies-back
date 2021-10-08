const express = require('express')
const endpoint = express.Router()
const { getRoot, findCollection, addFavorites } = require('../controllers/controllers')

endpoint.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "https://senichimaro.github.io/lovies/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

endpoint.get('/', getRoot )

endpoint.post('/find-favorites', findCollection )
endpoint.post('/add-favorites', addFavorites )

module.exports = endpoint
