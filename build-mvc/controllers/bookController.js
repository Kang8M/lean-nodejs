var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');
var mongoose = require('mongoose');
var async = require('async');
const {body, validationResult} = require('express-validator');

exports.index = function(req, res) {
    async.parallel({
        book_count: (callback) => {
            Book.countDocuments({}, callback)
        },
        book_instance_count: function(callback) {
            BookInstance.countDocuments({}, callback);
        },
        book_instance_available_count: function(callback) {
            BookInstance.countDocuments({status:'Available'}, callback);
        },
        author_count: function(callback) {
            Author.countDocuments({}, callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        }
    }, (err, result) => {
        res.render('index', {
            title: 'Local Library Home',
            error: err,
            data: result
        })
    })
};

// Display list of all books.
exports.book_list = function(req, res, next) {
    Book.find({}, 'title author')
        .populate('author')
        .exec((err, list_books) => {
            if (err) return next(err)

            res.render('book_list', {
                title: 'Book List',
                book_list: list_books
            })
        })
};

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {
    let id = mongoose.Types.ObjectId(req.params.id);
    async.parallel({
        book: function(callback) {
            Book.findById(id)
                .populate('author')
                .populate('genre')
                .exec(callback);
        },
        book_instance: function(callback) {
            BookInstance.find({ 'book': id })
                .exec(callback);
        }
    }, function(err, results) {
        if (err) return next(err);
        if(results.book == null) {
            var err = new Error('Book not found')
            err.status = 404;
            return next(err);
        }

        res.render('book_detail', {
            title: results.book.title,
            book: results.book,
            book_instances: results.book_instance
        })
    })
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
    async.parallel({
        author_list: function(callback) {
            Author.find(callback);
        },
        genre_list: function(callback) {
            Genre.find(callback)
        }
    }, function(err, results) {
        if(err) return next(err);
        res.render('book_form', {
            title: 'Create Book',
            authors: results.author_list,
            genres: results.genre_list
        })
    });
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};