const Item = require('../models/item');

// Display list of all Items
exports.itemsList = (req, res) => {
  res.send('NOT IMPLEMENTED: Items List');
};

// Display detail Page for Specific Items
exports.itemsDetail = (req, res) => {
  res.send(`NOT IMPLREMENTED: Items Detail: ${req.params.id}`);
};

// Display Items Create form on GET
exports.itemsCreateGet = (req, res) => {
  res.send('NOT IMPLEMENTED: Items create Get');
};

// Handle Items create on Post
exports.itemsCreatePost = (req, res) => {
  res.send('NOT IMPLEMENTED: Items create Post');
};

// Display Items delete form on GET
exports.itemsDeleteGet = (req, res) => {
  res.send('NOT IMPLEMENTED: Items delete Get');
};

// Handle Items create on Post
exports.itemsDeletePost = (req, res) => {
  res.send('NOT IMPLEMENTED: Items delete Post');
};

// Display Items update form on GET
exports.itemsUpdateGet = (req, res) => {
  res.send('NOT IMPLEMENTED: Items update Get');
};

// Handle Items update on Post
exports.itemsUpdatePost = (req, res) => {
  res.send('NOT IMPLEMENTED: Items update Post');
};
