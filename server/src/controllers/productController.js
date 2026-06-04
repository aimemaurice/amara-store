const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getAllProducts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 12);
    const search = req.query.search ? req.query.search.trim() : null;
    const categoryQuery = req.query.category ? req.query.category.trim() : null;
    const sort = req.query.sort ? req.query.sort.trim() : 'createdAtDesc';

    const filters = {};

    if (search) {
      filters.name = { $regex: search, $options: 'i' };
    }

    if (categoryQuery) {
      const categoryFilter = mongoose.Types.ObjectId.isValid(categoryQuery)
        ? { _id: categoryQuery }
        : { slug: categoryQuery };
      const category = await Category.findOne(categoryFilter);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      filters.category = category._id;
    }

    const sortOptions = {
      priceAsc: { price: 1 },
      priceDesc: { price: -1 },
      ratingAsc: { rating: 1 },
      ratingDesc: { rating: -1 },
      nameAsc: { name: 1 },
      nameDesc: { name: -1 },
      createdAtAsc: { createdAt: 1 },
      createdAtDesc: { createdAt: -1 },
    };

    const sortOption = sortOptions[sort] || sortOptions.createdAtDesc;
    const total = await Product.countDocuments(filters);
    const products = await Product.find(filters)
      .populate('category', 'name slug')
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      images = [],
      category,
      sizes = [],
      colors = [],
      stock = 0,
    } = req.body;

    if (!name || !slug || !description || price == null || !category) {
      return res.status(400).json({ message: 'Name, slug, description, price, and category are required' });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const product = await Product.create({
      name,
      slug,
      description,
      price,
      images,
      category,
      sizes,
      colors,
      stock,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.category) {
      const categoryExists = await Category.findById(updates.category);
      if (!categoryExists) {
        return res.status(404).json({ message: 'Category not found' });
      }
    }

    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
