const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', moviesController.createEntry);

module.exports = router;