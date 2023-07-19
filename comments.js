// Create web server

var express = require('express');
var router = express.Router();
var Comments = require('../models/comments.js');

// Get all comments
router.get('/', function(req, res) {
    Comments.find({}, function(err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(data);
        }
    });
});

// Post new comment
router.post('/', function(req, res) {
    var addedComment = new Comments(req.body);
    addedComment.save(function(err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(data);
        }
    });
});

// Delete a comment
router.delete('/:id', function(req, res) {
    var id = req.params.id;
    Comments.findByIdAndRemove(id, function(err) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;