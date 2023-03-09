const Item = require('../models/item');

// Display list of all Items
exports.itemList = (req, res) => {
  res.send('NOT IMPLEMENTED: Items List');
};

// Display detail Page for Specific Items
exports.itemDetail = (req, res) => {
  res.send(`NOT IMPLREMENTED: Items Detail: ${req.params.id}`);
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
