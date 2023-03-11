const { body, validationResult } = require('express-validator');

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
exports.categoryDetail = (req, res, next) => {
  Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ])
    .then((results) => {
      res.render('categoryDetail', {
        title: 'Category Detail',
        category: results[0],
        categoryItems: results[1],
      });
    })
    .catch((err) => next(err));
};

// Display Category Create form on GET
exports.categoryCreateGet = (req, res) => {
  res.render('CategoryForm', { title: 'Create Category' });
};

// Handle Category create on Post
exports.categoryCreatePost = [
  body('name', 'Category name required').trim().isLength({ min: 3 }).escape(),
  body('description', 'Category description required')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render('CategoryForm', {
        title: 'Create Category',
        category,
        errors: errors.array(),
      });
      return;
    }
    Category.findOne({ name: req.body.name })
      .exec()
      .then((found) => {
        if (found) {
          res.redirect(found.url);
        } else {
          category
            .save()
            .then(() => {
              res.redirect(category.url);
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  },
];

// Display Category delete form on GET
exports.categoryDeleteGet = (req, res, next) => {
  Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ])
    .then(([category, items]) => {
      if (category == null) {
        res.redirect('/Inventar/categories');
      }
      res.render('CategoryDelete', {
        title: 'Delete Category',
        category,
        items,
      });
    })
    .catch((err) => next(err));
};

// Handle Category create on Post
exports.categoryDeletePost = (req, res, next) => {
  Promise.all([
    Category.findById(req.body.categoryId).exec(),
    Item.find({ category: req.body.categoryId }).exec(),
  ])
    .then(([category, items]) => {
      if (items.length > 0) {
        res.render('categoryDelete', {
          title: 'Delete Category',
          category,
          items,
        });
        Promise.reject(new Error('Category is not empty!'));
      }
    })
    .then(() => Category.findByIdAndRemove(req.body.categoryId).exec())
    .then(() => {
      res.redirect('/Inventar/categories');
    })
    .catch((err) => next(err));
};

// Display Category update form on GET
exports.categoryUpdateGet = (req, res, next) => {
  Category.findById(req.params.id)
    .exec()
    // eslint-disable-next-line consistent-return
    .then((category) => {
      if (category == null) {
        const err = new Error('Category not found');
        err.status = 404;
        return next(err);
      }

      res.render('CategoryForm', {
        title: 'Update Category',
        category,
      });
    })
    .catch((err) => next(err));
};

// Handle Category update on Post
exports.categoryUpdatePost = [
  body('name', 'Category name required').trim().isLength({ min: 3 }).escape(),
  body('description', 'Category description required')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render('CategoryForm', {
        title: 'Update Category',
        category,
        errors: errors.array(),
      });
      return;
    }
    Category.findByIdAndUpdate(req.params.id, category, {})
      .exec()
      .then((theCategory) => {
        res.redirect(theCategory.url);
      })
      .catch((err) => next(err));
  },
];
