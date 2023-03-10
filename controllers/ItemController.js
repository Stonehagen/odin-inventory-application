const Item = require('../models/item');
const Category = require('../models/category');

// Display list of all Items
exports.itemList = (req, res, next) => {
  Item.find({}, 'name price')
    .sort({ name: 1 })
    .exec()
    .then((listItem) => {
      res.render('itemList', {
        title: 'Items',
        itemList: listItem,
      });
    })
    .catch((err) => next(err));
};

// Display detail Page for Specific Items
exports.itemDetail = (req, res, next) => {
  Item.findById(req.params.id).exec()
    .then((item) => {
      res.render('itemDetail', {
        title: 'Item Detail',
        item,
      });
    })
    .catch((err) => next(err));
};

// Display Items Create form on GET
exports.itemCreateGet = (req, res) => {
  res.send('NOT IMPLEMENTED: Items create Get');
};

// Handle Items create on Post
exports.itemCreatePost = (req, res) => {
  res.send('NOT IMPLEMENTED: Items create Post');
};

// Display Items delete form on GET
exports.itemDeleteGet = (req, res) => {
  res.send('NOT IMPLEMENTED: Items delete Get');
};

// Handle Items create on Post
exports.itemDeletePost = (req, res) => {
  res.send('NOT IMPLEMENTED: Items delete Post');
};

// Display Items update form on GET
exports.itemUpdateGet = (req, res) => {
  res.send('NOT IMPLEMENTED: Items update Get');
};

// Handle Items update on Post
exports.itemUpdatePost = (req, res) => {
  res.send('NOT IMPLEMENTED: Items update Post');
};
