const Category = require('../models/category');

exports.index = (req, res) => {
  res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all Categories
exports.categoryList = (req, res) => {
  res.send('NOT IMPLEMENTED: Category List');
};

// Display detail Page for Specific Category
exports.categoryDetail = (req, res) => {
  res.send(`NOT IMPLREMENTED: Category Detail: ${req.params.id}`);
};

// Display Category Create form on GET
exports.categoryCreateGet = (req, res) => {
  res.send('NOT IMPLEMENTED: Category create Get');
};

// Handle Category create on Post
exports.categoryCreatePost = (req, res) => {
  res.send('NOT IMPLEMENTED: Category create Post');
};

// Display Category delete form on GET
exports.categoryDeleteGet = (req, res) => {
  res.send('NOT IMPLEMENTED: Category delete Get');
};

// Handle Category create on Post
exports.categoryDeletePost = (req, res) => {
  res.send('NOT IMPLEMENTED: Category delete Post');
};

// Display Category update form on GET
exports.categoryUpdateGet = (req, res) => {
  res.send('NOT IMPLEMENTED: Category update Get');
};

// Handle Category update on Post
exports.categoryUpdatePost = (req, res) => {
  res.send('NOT IMPLEMENTED: Category update Post');
};
