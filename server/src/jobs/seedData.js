const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Category = require('../models/Category');
const Product = require('../models/Product');

dotenv.config();

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const randStock = () => Math.floor(Math.random() * 41) + 10; // 10-50

// Product image URLs for each category
const pic = {
  dresses: [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80',
    'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
  ],
  tops: [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    'https://images.unsplash.com/photo-1485230895905-ec40ba36b9f3?w=800&q=80',
  ],
  jackets: [
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&q=80',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    'https://images.unsplash.com/photo-1520975916090-8344b3a4e88b?w=800&q=80',
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
  ],
  accessories: [
    'https://images.unsplash.com/photo-1584917865442-5bb5b5f94943?w=800&q=80',
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
    'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80',
    'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
  ],
};

const categories = [
  { name: 'Dresses', slug: 'dresses', description: 'Elegant dresses crafted for modern silhouettes.', image: pic.dresses[0] },
  { name: 'Tops', slug: 'tops', description: 'Refined tops and blouses for day-to-night dressing.', image: pic.tops[0] },
  { name: 'Jackets', slug: 'jackets', description: 'Tailored jackets and outerwear, luxe finishes.', image: pic.jackets[0] },
  { name: 'Accessories', slug: 'accessories', description: 'Statement accessories to complete every look.', image: pic.accessories[0] },
];

const products = [
  // Dresses (6)
  {
    name: 'Sable Silk Slip Dress',
    slug: 'sable-silk-slip-dress',
    description: 'Bias-cut silk slip dress with a fluid drape and a subtle sheen — effortlessly elegant for evening wear.',
    price: 169.0,
    images: [pic.dresses[0]],
    categorySlug: 'dresses',
    sizes,
    colors: ['Onyx', 'Champagne'],
    stock: randStock(),
  },
  {
    name: 'Amani Wrap Midi',
    slug: 'amani-wrap-midi',
    description: 'Wrap-front midi dress with sculpted sleeves and soft pleating for graceful movement.',
    price: 139.5,
    images: [pic.dresses[1]],
    categorySlug: 'dresses',
    sizes,
    colors: ['Terracotta', 'Ivory'],
    stock: randStock(),
  },
  {
    name: 'Kaduna Tiered Maxi',
    slug: 'kaduna-tiered-maxi',
    description: 'Lightweight tiered maxi with a high neckline and artisanal stitch detailing — a relaxed-but-refined silhouette.',
    price: 129.99,
    images: [pic.dresses[2]],
    categorySlug: 'dresses',
    sizes,
    colors: ['Sienna', 'Olive'],
    stock: randStock(),
  },
  {
    name: 'Nairobi Tailored Sheath',
    slug: 'nairobi-tailored-sheath',
    description: 'Structured sheath dress with precise tailoring and an invisible zip for a clean, modern finish.',
    price: 149.0,
    images: [pic.dresses[3]],
    categorySlug: 'dresses',
    sizes,
    colors: ['Midnight', 'Stone'],
    stock: randStock(),
  },
  {
    name: 'Zuri Floral Midi',
    slug: 'zuri-floral-midi',
    description: 'Delicate floral-print midi with softly gathered waist and cap sleeves for a timeless day look.',
    price: 89.99,
    images: [pic.dresses[4]],
    categorySlug: 'dresses',
    sizes,
    colors: ['Blush', 'Ivory'],
    stock: randStock(),
  },
  {
    name: 'Eka Off-Shoulder Gown',
    slug: 'eka-off-shoulder-gown',
    description: 'An off-shoulder evening gown with structured bodice and sweeping skirt — made for special occasions.',
    price: 199.0,
    images: [pic.dresses[5]],
    categorySlug: 'dresses',
    sizes,
    colors: ['Ebony', 'Gold'],
    stock: randStock(),
  },

  // Tops (6)
  {
    name: 'Lagos Silk Blouse',
    slug: 'lagos-silk-blouse',
    description: 'Fluid silk blouse with a soft drape and elongated cuffs — perfect tucked or worn loose.',
    price: 99.0,
    images: [pic.tops[0]],
    categorySlug: 'tops',
    sizes,
    colors: ['Cream', 'Sable'],
    stock: randStock(),
  },
  {
    name: 'Ife Puff Sleeve Top',
    slug: 'ife-puff-sleeve-top',
    description: 'Lightweight blouse with sculpted puff sleeves and a neat button front for modern romance.',
    price: 74.0,
    images: [pic.tops[1]],
    categorySlug: 'tops',
    sizes,
    colors: ['White', 'Navy'],
    stock: randStock(),
  },
  {
    name: 'Mali Rib Knit Tee',
    slug: 'mali-rib-knit-tee',
    description: 'Fine-rib tee in breathable cotton with a flattering scooped neckline.',
    price: 39.5,
    images: [pic.tops[2]],
    categorySlug: 'tops',
    sizes,
    colors: ['Stone', 'Black'],
    stock: randStock(),
  },
  {
    name: 'Esi Satin Camisole',
    slug: 'esi-satin-camisole',
    description: 'Minimal satin camisole with delicate straps, ideal for layering or evening wear.',
    price: 59.0,
    images: [pic.tops[3]],
    categorySlug: 'tops',
    sizes,
    colors: ['Ivory', 'Champagne'],
    stock: randStock(),
  },
  {
    name: 'Kano Button-Down Shirt',
    slug: 'kano-button-down-shirt',
    description: 'Crisp button-down in lightweight cotton with an elongated hem for effortless tailoring.',
    price: 69.99,
    images: [pic.tops[4]],
    categorySlug: 'tops',
    sizes,
    colors: ['Sky', 'White'],
    stock: randStock(),
  },

  // Jackets (6)
  {
    name: 'Kigali Tailored Blazer',
    slug: 'kigali-tailored-blazer',
    description: 'Single-breasted tailored blazer with sculpted shoulders and a slim fit for polished looks.',
    price: 179.0,
    images: [pic.jackets[0]],
    categorySlug: 'jackets',
    sizes,
    colors: ['Charcoal', 'Olive'],
    stock: randStock(),
  },
  {
    name: 'Harbor Leather Jacket',
    slug: 'harbor-leather-jacket',
    description: 'Premium leather jacket with refined hardware and a slim, modern cut.',
    price: 199.0,
    images: [pic.jackets[1]],
    categorySlug: 'jackets',
    sizes,
    colors: ['Black', 'Walnut'],
    stock: randStock(),
  },
  {
    name: 'Asante Trench Coat',
    slug: 'asante-trench-coat',
    description: 'Classic trench with storm flap and belted waist in a water-resistant finish.',
    price: 159.0,
    images: [pic.jackets[2]],
    categorySlug: 'jackets',
    sizes,
    colors: ['Sand', 'Navy'],
    stock: randStock(),
  },
  {
    name: 'Serengeti Utility Overshirt',
    slug: 'serengeti-utility-overshirt',
    description: 'A versatile overshirt with patch pockets and a relaxed silhouette for layering.',
    price: 119.0,
    images: [pic.jackets[3]],
    categorySlug: 'jackets',
    sizes,
    colors: ['Olive', 'Khaki'],
    stock: randStock(),
  },

  // Accessories (6)
  {
    name: 'Asha Gold Hoop Earrings',
    slug: 'asha-gold-hoop-earrings',
    description: 'Polished gold hoop earrings with a secure clasp — an essential everyday accessory.',
    price: 49.0,
    images: [pic.accessories[0]],
    categorySlug: 'accessories',
    sizes: [],
    colors: ['Gold'],
    stock: randStock(),
  },
  {
    name: 'Nomad Leather Wallet',
    slug: 'nomad-leather-wallet',
    description: 'Slim leather wallet with multiple card slots and a soft, worn finish.',
    price: 59.5,
    images: [pic.accessories[1]],
    categorySlug: 'accessories',
    sizes: [],
    colors: ['Tan', 'Black'],
    stock: randStock(),
  },
  {
    name: 'Zola Beaded Necklace',
    slug: 'zola-beaded-necklace',
    description: 'Hand-strung beaded necklace combining glass and metal beads for textured elegance.',
    price: 69.0,
    images: [pic.accessories[2]],
    categorySlug: 'accessories',
    sizes: [],
    colors: ['Turquoise', 'Gold'],
    stock: randStock(),
  },
  {
    name: 'Reka Leather Belt',
    slug: 'reka-leather-belt',
    description: 'Structured leather belt with gold hardware — perfect to cinch dresses and coats.',
    price: 39.99,
    images: [pic.accessories[3]],
    categorySlug: 'accessories',
    sizes: [],
    colors: ['Black', 'Brown'],
    stock: randStock(),
  },
  {
    name: 'Kito Raffia Clutch',
    slug: 'kito-raffia-clutch',
    description: 'Handwoven raffia clutch with a structured frame and soft lining.',
    price: 79.0,
    images: [pic.accessories[4]],
    categorySlug: 'accessories',
    sizes: [],
    colors: ['Natural', 'Black'],
    stock: randStock(),
  },
  {
    name: 'Tala Silk Scarf',
    slug: 'tala-silk-scarf',
    description: 'Large silk scarf printed with a contemporary motif — versatile as a head wrap or neck scarf.',
    price: 29.99,
    images: [pic.accessories[5]],
    categorySlug: 'accessories',
    sizes: [],
    colors: ['Coral', 'Ivory'],
    stock: randStock(),
  },
];

const seed = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany();
    await Category.deleteMany();

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    const categoryMap = createdCategories.reduce((acc, c) => {
      acc[c.slug] = c._id;
      return acc;
    }, {});

    // Map products to include category ObjectId
    const productsToInsert = products.map((p) => ({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      images: p.images,
      category: categoryMap[p.categorySlug],
      sizes: p.sizes,
      colors: p.colors,
      stock: p.stock,
    }));

    await Product.insertMany(productsToInsert);

    console.log('Seed data imported successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed data import failed:', error);
    process.exit(1);
  }
};

seed();
