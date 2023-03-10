const Category = require('../models/category');
const Item = require('../models/item');

exports.index = (req, res) => {
  const renderIndex = (err, results) => {
    res.render('index', {
      title: 'Inventory Home',
      error: err,
      data: results,
    });
  };

  Promise.all([Category.countDocuments({}), Item.countDocuments({})])
    .then((results) => {
      const counts = { categoryCount: results[0], itemCount: results[1] };
      renderIndex(undefined, counts);
    })
    .catch((err) => {
      renderIndex(err);
    });
};

// Display list of all Categories
exports.categoryList = (req, res, next) => {
  Category.find({}, 'name')
    .sort({ name: 1 })
    .exec()
    .then((listCategory) => {
      res.render('categoryList', {
        title: 'Categories',
        categoryList: listCategory,
      });
    })
    .catch((err) => next(err));
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
