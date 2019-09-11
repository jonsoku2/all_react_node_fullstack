const Category = require("../models/category");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category does not exist"
      });
    }
    req.category = category;
    next();
  });
};

exports.create = async (req, res) => {
  try {
    const category = await Category.findOne(req.body);
    if (category) {
      return res.status(400).json({ error: "이미 존재하는 카테고리입니다. " });
    }
    const newCategory = new Category(req.body);
    const result = await newCategory.save();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

exports.readAll = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err || !categories) {
      return res.status(400).json({
        error: "Categories does not exist!"
      });
    }
    return res.json(categories);
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};
