#! /usr/bin/env node
/* eslint-disable no-console */
const mongoose = require('mongoose');
const async = require('async');

console.log(
  'This script populates some test items and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/inventory_application?retryWrites=true&w=majority"',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require('./models/category');
const Item = require('./models/item');

mongoose.set('strictQuery', false);
const mongoDB = userArgs[0];

async function main() {
  await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));

const categories = [];
const items = [];

const CategoryCreate = (name, description, cb) => {
  const categorydetail = { name, description };
  const category = new Category(categorydetail);

  category.save().then(() => {
    console.log(`New Category: ${category}`);
    categories.push(category);
    cb(null, category);
  });
};

const ItemCreate = (name, description, category, price, stock, cb) => {
  const itemdetail = {
    name,
    description,
    price,
    stock,
  };

  // eslint-disable-next-line eqeqeq
  if (category != false) itemdetail.category = category;
  const item = new Item(itemdetail);

  item.save().then(() => {
    // eslint-disable-next-line prefer-template
    console.log('New Item: ' + item);
    items.push(item);
    cb(null, item);
  });
};

function createCategories(cb) {
  async.series(
    [
      (callback) => {
        CategoryCreate(
          'Fruits',
          'A fine selection of delicious fruits.',
          callback,
        );
      },
      (callback) => {
        CategoryCreate(
          'Vegetables',
          'Everything from Broccoli to Pumkins.',
          callback,
        );
      },
      (callback) => {
        CategoryCreate('Bread', 'A fresh and healthy choice.', callback);
      },
      (callback) => {
        CategoryCreate('Dairy', 'Cheese and more.', callback);
      },
      (callback) => {
        CategoryCreate('Snacks', 'Crackers, Candy, Gum...', callback);
      },
      (callback) => {
        CategoryCreate('Pasta', 'Just like in Italy.', callback);
      },
      (callback) => {
        CategoryCreate('Frozen Food', 'Buy now and forget it later.', callback);
      },
      (callback) => {
        CategoryCreate('Other', 'All the other things.', callback);
      },
    ],
    // optional callback
    cb,
  );
}

function createItems(cb) {
  async.parallel(
    [
      (callback) => {
        ItemCreate(
          'Melon',
          'green round Melon',
          categories[0],
          2.99,
          14,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Banana',
          'yellow with some brown spots',
          categories[0],
          0.99,
          165,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Papaya',
          'orange and delicious',
          categories[0],
          3.99,
          31,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Pear',
          'green hard and small',
          categories[0],
          0.89,
          43,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Onion',
          'buy one and get one',
          categories[1],
          0.39,
          143,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Corn',
          'yellow and verry small',
          categories[1],
          2.39,
          17,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Potato',
          'these are realy dirty',
          categories[1],
          0.41,
          211,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'White Bread',
          'Does anybody buy this stuff?',
          categories[2],
          2.19,
          37,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Baguette',
          'Its simply French!',
          categories[2],
          1.89,
          11,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Donut',
          'This is Stil bread',
          categories[2],
          0.59,
          30,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Milk',
          '3.8% fat, quite good',
          categories[3],
          2.19,
          41,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Butter',
          'with salt and many fat',
          categories[3],
          3.89,
          17,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Pretzels',
          'hard salty and dry',
          categories[4],
          6.19,
          18,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Pringles',
          'no comment on this',
          categories[4],
          3.19,
          61,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Penne',
          'medium size and hollow',
          categories[5],
          3.69,
          15,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Farfalle',
          'sweet looking noodles',
          categories[5],
          4.14,
          21,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Crushed Ice',
          'Water in a useful form',
          categories[6],
          4.39,
          32,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Foyo',
          'Just Frozen Yogurt',
          categories[6],
          2.89,
          15,
          callback,
        );
      },
      (callback) => {
        ItemCreate(
          'Shopping Cart',
          'not for sale',
          categories[7],
          992300.81,
          34,
          callback,
        );
      },
    ],
    // optional callback
    cb,
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  (err) => {
    if (err) {
      console.log(`FINAL ERR: ${err}`);
    } else {
      console.log('done');
    }
    // All done, disconnect from database
    mongoose.connection.close();
  },
);
