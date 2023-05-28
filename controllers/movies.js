const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().db('entertainment').collection('movies').find();
        result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
} catch (err) {
    res.status(500).json(err);
}
};

const getSingle = async (req, res, next) => {
    try {
    const entryId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('entertainment')
        .collection('movies')
        .find({ _id: entryId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
} catch (err) {
    res.status(500).json(err);
}
};

const createEntry = async (req, res) => {
    try {
    const movie = {
        title: req.body.title,
        genre: req.body.genre,
        rating: req.body.rating,
        releaseYear: req.body.releaseYear,
        famousActor: req.body.famousActor
    };
    const response = await mongodb.getDb().db('entertainment').collection('movies').insertOne(movie);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error ocurred while creating the movie entry.');
    }
} catch (err) {
    res.status(500).json(err);
}
};

const updateEntry = async (req, res) => {
    try {
    const entryId = new ObjectId(req.params.id);
    const movie = {
        title: req.body.title,
        genre: req.body.genre,
        rating: req.body.rating,
        releaseYear: req.body.releaseYear,
        famousActor: req.body.famousActor
    };
    const response = await mongodb
        .getDb()
        .db('entertainment')
        .collection('movies')
        .replaceOne({ _id: entryId }, movie);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the movie entry.');
    }
} catch (err) {
    res.status(500).json(err);
}
};

const deleteEntry = async (req, res) => {
    try{
    const entryId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('entertainment').collection('movies').deleteOne({ _id: entryId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the movie entry.');
    }
} catch (err) {
    res.status(500).json(err);
}
};

module.exports = {
    getAll,
    getSingle,
    createEntry,
    updateEntry,
    deleteEntry
};