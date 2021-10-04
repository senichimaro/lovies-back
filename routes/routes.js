const express = require('express')
const endpoint = express.Router()
const { getRoot, findCollection, addFavorites } = require('../controllers/controllers')

endpoint.get('/', getRoot )

endpoint.post('/find-favorites', findCollection )
endpoint.post('/add-favorites', addFavorites )

module.exports = endpoint