const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Category = require('../models/Category');
const Product = require('../models/Product');

dotenv.config();

const categories = [
  {
    name: 'Dresses',
    slug: 'dresses',
    description: 'Stylish dresses for every occasion.',
    image: 'https://images.unsplash.com/photo-1520975910-6647a3c92e1f',
  },
  {
    name: 'Tops',
    slug: 'tops',
    description: 'Trendy tops and blouses.',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b7a6',
  },
  {
    name: 'Jackets',
    slug: 'jackets',
    description: 'Fashionable jackets and outerwear.',
    image: 'https://images.unsplash.com/photo-1526178612450-7018f96a0248',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Accessories to complete your look.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
  },
];

const products = [
  {
    name: 'Empress Wrap Dress',
    slug: 'empress-wrap-dress',
    description: 'A flattering wrap dress with bold African-inspired patterns.',
    price: 89.99,
    images: ['https://images.unsplash.com/photo-1483985988355-763728e1935b'],
    categorySlug: 'dresses',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gold', 'Black'],
    stock: 34,
  },
  {
    name: 'Sunrise Midi Dress',
    slug: 'sunrise-midi-dress',
    description: 'Lightweight midi dress with elegant statement sleeves.',
    price: 74.5,
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f'],
    categorySlug: 'dresses',
    sizes: ['S', 'M', 'L'],
    colors: ['Coral', 'Ivory'],
    stock: 28,
  },
  {
    name: 'Kente Maxi Dress',
    slug: 'kente-maxi-dress',
    description: 'Bold maxi dress featuring colorful Kente motifs.',
    price: 129.0,
    images: ['https://images.unsplash.com/photo-1495121605193-b116b5b9c5d4'],
    categorySlug: 'dresses',
    sizes: ['M', 'L', 'XL'],
    colors: ['Multicolor'],
    stock: 16,
  },
  {
    name: 'Aso Oke Crop Top',
    slug: 'aso-oke-crop-top',
    description: 'Cropped top with premium Aso Oke fabric accents.',
    price: 45.0,
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f'],
    categorySlug: 'tops',
    sizes: ['S', 'M', 'L'],
    colors: ['Navy', 'White'],
    stock: 42,
  },
  {
    name: 'Silk Peplum Blouse',
    slug: 'silk-peplum-blouse',
    description: 'Elegant silk blouse with a flattering peplum waist.',
    price: 62.9,
    images: ['https://images.unsplash.com/photo-1520975910-6647a3c92e1f'],
    categorySlug: 'tops',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blush', 'Ivory'],
    stock: 37,
  },
  {
    name: 'Lace Bardot Top',
    slug: 'lace-bardot-top',
    description: 'Romantic bardot top with delicate lace details.',
    price: 54.99,
    images: ['https://images.unsplash.com/photo-1523362628745-0c100150b7a6'],
    categorySlug: 'tops',
    sizes: ['S', 'M', 'L'],
    colors: ['Champagne', 'Black'],
    stock: 29,
  },
  {
    name: 'Safari Utility Jacket',
    slug: 'safari-utility-jacket',
    description: 'A structured utility jacket for everyday style.',
    price: 99.0,
    images: ['https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb'],
    categorySlug: 'jackets',
    sizes: ['M', 'L', 'XL'],
    colors: ['Olive', 'Khaki'],
    stock: 21,
  },
  {
    name: 'Velvet Bomber Jacket',
    slug: 'velvet-bomber-jacket',
    description: 'Luxurious bomber jacket with velvet finish.',
    price: 119.0,
    images: ['https://images.unsplash.com/photo-1526178612450-7018f96a0248'],
    categorySlug: 'jackets',
    sizes: ['S', 'M', 'L'],
    colors: ['Burgundy', 'Black'],
    stock: 14,
  },
  {
    name: 'Denim Trucker Jacket',
    slug: 'denim-trucker-jacket',
    description: 'Classic denim jacket with modern tailoring.',
    price: 89.5,
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f'],
    categorySlug: 'jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue'],
    stock: 26,
  },
  {
    name: 'Gold Choker Necklace',
    slug: 'gold-choker-necklace',
    description: 'Statement choker necklace with polished gold plating.',
    price: 39.99,
    images: ['https://images.unsplash.com/photo-1526178612450-7018f96a0248'],
    categorySlug: 'accessories',
    sizes: [],
    colors: ['Gold'],
    stock: 55,
  },
  {
    name: 'Beaded Clutch Bag',
    slug: 'beaded-clutch-bag',
    description: 'Handcrafted clutch with intricate beadwork.',
    price: 54.0,
    images: ['https://images.unsplash.com/photo-1495121605193-b116b5b9c5d4'],
    categorySlug: 'accessories',
    sizes: [],
    colors: ['Turquoise', 'Black'],
    stock: 33,
  },
  {
    name: 'Silk Head Wrap',
    slug: 'silk-head-wrap',
    description: 'Soft silk head wrap in bold prints.',
    price: 24.95,
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f'],
    categorySlug: 'accessories',
    sizes: [],
    colors: ['Purple', 'Red'],
    stock: 48,
  },
];

const seed = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Category.deleteMany();

    const createdCategories = await Category.insertMany(categories);
    const categoryMap = createdCategories.reduce((acc, category) => {
      acc[category.slug] = category._id;
      return acc;
    }, {});

    const seededProducts = products.map((product) => ({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      images: product.images,
      category: categoryMap[product.categorySlug],
      sizes: product.sizes,
      colors: product.colors,
      stock: product.stock,
    }));

    await Product.insertMany(seededProducts);

    console.log('Seed data imported successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed data import failed:', error);
    process.exit(1);
  }
};

seed();
