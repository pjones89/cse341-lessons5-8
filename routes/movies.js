const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', moviesController.createEntry);

router.put('/:id', moviesController.updateEntry);

router.delete('/:id', moviesController.deleteEntry);

module.exports = router;