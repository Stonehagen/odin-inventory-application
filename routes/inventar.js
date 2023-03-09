const express = require('express');

const router = express.Router();

// Require controller modules.
const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');

/// Category Routes ///

// GET Inventar home page.
router.get('/', categoryController.index);

// GET request for creating a category
router.get('/category/create', categoryController.categoryCreateGet);

// POST request for creating a category
router.get('/category/create', categoryController.categoryCreatePost);

// GET request for delete a category
router.get('/category/:id/delete', categoryController.categoryDeleteGet);

// POST request for delete a category
router.get('/category/:id/delete', categoryController.categoryDeletePost);

// GET request for update a category
router.get('/category/:id/update', categoryController.categoryUpdateGet);

// POST request for update a category
router.get('/category/:id/update', categoryController.categoryUpdatePost);

// GET request for one Category
router.get('/category/:id', categoryController.categoryDetail);

// GET request for list of all Category items
router.get('/categories', categoryController.categoryList);

/// Item Routes ///

// GET request for creating a item
router.get('/item/create', itemController.itemCreateGet);

// POST request for creating a item
router.get('/item/create', itemController.itemCreatePost);

// GET request for delete a item
router.get('/item/:id/delete', itemController.itemDeleteGet);

// POST request for delete a item
router.get('/item/:id/delete', itemController.itemDeletePost);

// GET request for update a item
router.get('/item/:id/update', itemController.itemUpdateGet);

// POST request for update a item
router.get('/item/:id/update', itemController.itemUpdatePost);

// GET request for one item
router.get('/item/:id', itemController.itemDetail);

// GET request for list of all items
router.get('/items', itemController.itemList);

module.exports = router;
