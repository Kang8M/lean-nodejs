var mongoose = require('mongoose');
const { body, validationResult } = require("express-validator");
var async = require('async');
var Genre = require('../models/genre');
var Book = require('../models/book');

// Display list of all Genre.
exports.genre_list = (req, res, next) => {
    Genre.find()
        .sort([['name', 'ascending']])
        .exec(function(err, list_genres) {
            if(err) return next(err);
            res.render('genre_list', {
                title: 'Genre List',
                genres: list_genres
            });
        })
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
    let id = mongoose.Types.ObjectId(req.params.id);
    async.parallel({
        genre: function(callback) {
            Genre.findById(id)
                .exec(callback);
        },
        genre_books: function(callback) {
            Book.find({ 'genre': id })
                .exec(callback);
        }
    }, function(err, results) {
        if (err) return next(err);
        if (results.genre == null) {
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }

        res.render('genre_detail', {
            title: 'Genre Detail',
            genre: results.genre,
            genre_books: results.genre_books
        })
    })
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res, next) {
    res.render('genre_form', {
        title: 'Create Genre'
    });
};

// Handle Genre create on POST.
exports.genre_create_post = [
    body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),
    function(req, res, next) {
        const errors = validationResult(req);
        var name = req.body.name;

        var genre = new Genre({
            name: name
        });

        if (!errors.isEmpty()) {
            res.render('genre_form', {
                title: 'Create Genre',
                genre: genre,
                errors: errors.array()
            });
            return;
        } else {
            Genre.findOne({ 'name': name })
                .exec(function(err, found_genre) {
                    if (err) return next(err);
                    
                    if (found_genre) {
                        res.redirect(found_genre.url);
                    } else {
                        genre.save(function(err) {
                            if (err) return next(err);
                            res.redirect(genre.url);
                        })
                    }
                })
        }
    }
];

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};