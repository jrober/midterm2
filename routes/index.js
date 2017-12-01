var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Posting');

router.put('/comments/:comment/upvote', function(req, res, next) {
  console.log('made it in put');
  req.comment.upOrder(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

router.put('/comments/:comment/addToCart', function(req, res, next) {
  console.log('made it in addCart');
  req.comment.addCart(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

router.put('/comments/:comment/deleteCart', function(req, res, next) {
  console.log('made it in addCart');
  req.comment.deleteCart(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }
    console.log('comment found');
    req.comment = comment;
    return next();
  });
});

router.get('/comments/:comment', function(req, res) {
  res.json(req.comment);
});

router.post('/comments',function(req,res,next) {
  console.log(req.body);
	var comment = new Comment(req.body);
	comment.save(function(err,comment){
		if(err){return next(err);}
		res.json(comment);
	}); 	
});
router.delete('/comments/:comment', function(req, res) {
  console.log("in Delete");
  req.comment.remove();
  res.sendStatus(200);
});

router.get('/comments',function(req,res,next) {
	Comment.find(function(err, comments) {
		if(err){return next(err);}
		res.json(comments);
	});
});

module.exports = router;
