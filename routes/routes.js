const express = require('express')
const endpoint = express.Router()
const { getRoot, findFavorites, addFavorites } = require('../controllers/controllers')

endpoint.get('/', getRoot )

endpoint.post('/find-favorites', findFavorites )
endpoint.post('/add-favorites', addFavorites )

module.exports = endpoint