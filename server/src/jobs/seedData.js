const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Category = require('../models/Category');
const Product = require('../models/Product');

dotenv.config();

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const randStock = () => Math.floor(Math.random() * 41) + 10; // 10-50

// Picsum URLs provided by user (6 per category)
const pic = {
  dresses: [
    'https://picsum.photos/seed/dress1/800/1000',
    'https://picsum.photos/seed/dress2/800/1000',
    'https://picsum.photos/seed/dress3/800/1000',
    'https://picsum.photos/seed/dress4/800/1000',
    'https://picsum.photos/seed/dress5/800/1000',
    'https://picsum.photos/seed/dress6/800/1000',
  ],
  tops: [
    'https://picsum.photos/seed/top1/800/1000',
    'https://picsum.photos/seed/top2/800/1000',
    'https://picsum.photos/seed/top3/800/1000',
    'https://picsum.photos/seed/top4/800/1000',
    'https://picsum.photos/seed/top5/800/1000',
    'https://picsum.photos/seed/top6/800/1000',
  ],
  jackets: [
    'https://picsum.photos/seed/jacket1/800/1000',
    'https://picsum.photos/seed/jacket2/800/1000',
    'https://picsum.photos/seed/jacket3/800/1000',
    'https://picsum.photos/seed/jacket4/800/1000',
    'https://picsum.photos/seed/jacket5/800/1000',
    'https://picsum.photos/seed/jacket6/800/1000',
  ],
  accessories: [
    'https://picsum.photos/seed/accessory1/800/1000',
    'https://picsum.photos/seed/accessory2/800/1000',
    'https://picsum.photos/seed/accessory3/800/1000',
    'https://picsum.photos/seed/accessory4/800/1000',
    'https://picsum.photos/seed/accessory5/800/1000',
    'https://picsum.photos/seed/accessory6/800/1000',
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
