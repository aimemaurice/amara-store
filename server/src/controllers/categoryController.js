const Category = require('../models/Category');
const Product = require('../models/Product');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, slug, description = '', image = '' } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: 'Name and slug are required' });
    }

    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(409).json({ message: 'Category with this slug already exists' });
    }

    const category = await Category.create({ name, slug, description, image });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const productUsingCategory = await Product.findOne({ category: category._id });
    if (productUsingCategory) {
      return res.status(400).json({ message: 'Category cannot be deleted because it has associated products' });
    }

    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};
