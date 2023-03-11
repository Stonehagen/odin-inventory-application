const { body, validationResult } = require('express-validator');

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
  Item.findById(req.params.id)
    .exec()
    .then((item) => {
      res.render('itemDetail', {
        title: 'Item Detail',
        item,
      });
    })
    .catch((err) => next(err));
};

// Display Items Create form on GET
exports.itemCreateGet = (req, res, next) => {
  Category.find({})
    .exec()
    .then((categories) => {
      res.render('ItemForm', {
        title: 'Create Item',
        categories,
      });
    })
    .catch((err) => next(err));
};

// Handle Items create on Post
exports.itemCreatePost = [
  body('name', 'Item name required').trim().isLength({ min: 3 }).escape(),
  body('description', 'Item description required')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('category', 'item category required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'item price required')
    .notEmpty()
    .isFloat({ min: 0.01, max: 100000000 })
    .escape(),
  body('stock', 'item stock required')
    .notEmpty()
    .isInt({ min: 0, max: 1000000 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      res.render('ItemForm', {
        title: 'Create Item',
        item,
        errors: errors.array(),
      });
      return;
    }
    Item.findOne({ name: req.body.name })
      .exec()
      .then((found) => {
        if (found) {
          res.redirect(found.url);
        } else {
          item
            .save()
            .then(() => {
              res.redirect(item.url);
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  },
];

// Display Items delete form on GET
exports.itemDeleteGet = (req, res, next) => {
  Item.findById(req.params.id).exec()
    .then((item) => {
      if (item == null) {
        res.redirect('/Inventar/Items');
      }
      res.render('ItemDelete', {
        title: 'Delete Item',
        item,
      });
    })
    .catch((err) => next(err));
};

// Handle Items create on Post
exports.itemDeletePost = (req, res, next) => {
  Item.findByIdAndRemove(req.body.itemId).exec()
    .then(() => {
      res.redirect('/Inventar/items');
    })
    .catch((err) => next(err));
};

// Display Items update form on GET
exports.itemUpdateGet = (req, res) => {
  res.send('NOT IMPLEMENTED: Items update Get');
};

// Handle Items update on Post
exports.itemUpdatePost = (req, res) => {
  res.send('NOT IMPLEMENTED: Items update Post');
};
