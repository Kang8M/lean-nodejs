var Author = require('../models/author');
var Book = require('../models/book');
var mongoose = require('mongoose');
var async = require('async');
const { body, validationResult } = require('express-validator');

exports.author_list = (req, res, next) => {
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function(err, list_authors) {
        if (err) return next(err);

        res.render('author_list', {
            title: 'Author List',
            author_list: list_authors
        })
    })
}

// Display detail page for a specific Author.
exports.author_detail = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id);
    async.parallel({
        author: function(callback) {
            Author.findById(id).exec(callback);
        },
        author_books: function(callback) {
            Book.find({'author': id }).exec(callback)
        }
    }, function(err, results) {
        if (err) return next(err);
        if (results.author == null) {
            var err = new Error('Not Found Author');
            err.status = 404;
            return next(err);
        }
        res.render('author_detail', {
            title: results.author.name,
            author: results.author,
            author_books: results.author_books
        })
    })
};

// Display Author create form on GET.
exports.author_create_get = function(req, res, next) {
    res.render('author_form', {
        title: 'Create Author'
    })
};

// Handle Author create on POST.
exports.author_create_post = [
    body('first_name').trim()
        .isLength({ min: 1, max: 100})
        .escape()
        .withMessage('First name must be specified.')
        .isAlphanumeric()
        .withMessage('First name has non-alphanumeric characters.'),
    body('family_name').trim()
        .isLength({ min: 1, max: 100})
        .escape()
        .withMessage('Family name must be specified.')
        .isAlphanumeric()
        .withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth')
        .optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),
    body('date_of_death', 'Invalid date of death')
        .optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),
    function(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('author_form',{
                title: 'Create Author',
                author: req.body,
                errors: errors.array()
            });
            return;
        } else {
            var data = req.body;
            
            async.parallel({
                exist_author: function(callback) {
                    Author.countDocuments({
                        first_name: data.first_name,
                        family_name: data.family_name
                    }, callback);
                }
            }, function(err, results) {
                if (err) return next(err);
                
                if (results.exist_author == 0) {
                    var author = new Author({
                        first_name: data.first_name,
                        family_name: data.family_name,
                        date_of_birth: data.date_of_birth,
                        date_of_death: data.date_of_death
                    })
    
                    author.save(function(err) {
                        if (err) return next(err);
                        res.redirect(author.url);
                    })
                } else {
                    var err = new Error('The Author is exist!');
                    err.status = 404;
                    return next(err);
                }
            });
        }
    }
];

// Display Author delete form on GET.
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};