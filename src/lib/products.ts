export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Accessories' | 'Shoes';
  sizes: string[];
  colors: string[];
};

export const categories = [
    { name: 'Tops', image: 'https://picsum.photos/400/600?random=1', dataAiHint: 'shirt' },
    { name: 'Bottoms', image: 'https://picsum.photos/400/600?random=2', dataAiHint: 'pants' },
    { name: 'Dresses', image: 'https://picsum.photos/400/600?random=3', dataAiHint: 'dress' },
    { name: 'Outerwear', image: 'https://picsum.photos/400/600?random=4', dataAiHint: 'jacket' },
    { name: 'Accessories', image: 'https://picsum.photos/400/600?random=5', dataAiHint: 'handbag' },
    { name: 'Shoes', image: 'https://picsum.photos/400/600?random=6', dataAiHint: 'shoes' },
]

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Crewneck Tee",
    description: "A timeless staple for any wardrobe, made from ultra-soft pima cotton.",
    price: 45.0,
    image: "https://picsum.photos/600/800?random=11",
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Heather Grey"],
  },
  {
    id: 2,
    name: "Slim-Fit Chinos",
    description: "Versatile and comfortable, these chinos will take you from the office to the weekend.",
    price: 85.0,
    image: "https://picsum.photos/600/800?random=12",
    category: "Bottoms",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Khaki", "Navy", "Olive"],
  },
  {
    id: 3,
    name: "Floral Sundress",
    description: "Light and airy, this dress is perfect for sunny days and garden parties.",
    price: 120.0,
    image: "https://picsum.photos/600/800?random=13",
    category: "Dresses",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Yellow Floral", "Blue Ditsy"],
  },
  {
    id: 4,
    name: "Denim Jacket",
    description: "A rugged and stylish layering piece that only gets better with age.",
    price: 150.0,
    image: "https://picsum.photos/600/800?random=14",
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Vintage Wash", "Black"],
  },
  {
    id: 5,
    name: "Leather Crossbody Bag",
    description: "Chic and practical, this bag holds all your essentials in style.",
    price: 250.0,
    image: "https://picsum.photos/600/800?random=15",
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Tan", "Black"],
  },
  {
    id: 6,
    name: "Minimalist Sneakers",
    description: "Clean lines and premium materials make these the perfect everyday sneakers.",
    price: 175.0,
    image: "https://picsum.photos/600/800?random=16",
    category: "Shoes",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["White", "Stone"],
  },
  {
    id: 7,
    name: "Silk Blouse",
    description: "Elegant and fluid, this silk blouse adds a touch of luxury to any outfit.",
    price: 180.0,
    image: "https://picsum.photos/600/800?random=17",
    category: "Tops",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Champagne", "Black"],
  },
  {
    id: 8,
    name: "High-Waisted Jeans",
    description: "A flattering vintage-inspired fit with a modern stretch for comfort.",
    price: 130.0,
    image: "https://picsum.photos/600/800?random=18",
    category: "Bottoms",
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    colors: ["Light Wash", "Medium Wash"],
  },
  {
    id: 9,
    name: "Knit Midi Dress",
    description: "A sophisticated and comfortable dress that hugs your curves in all the right places.",
    price: 140.0,
    image: "https://picsum.photos/600/800?random=19",
    category: "Dresses",
    sizes: ["S", "M", "L"],
    colors: ["Camel", "Charcoal"],
  },
  {
    id: 10,
    name: "Wool Trench Coat",
    description: "A timeless outerwear piece that will keep you warm and stylish through the colder months.",
    price: 450.0,
    image: "https://picsum.photos/600/800?random=20",
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Black"],
  },
  {
    id: 11,
    name: "Gold Hoop Earrings",
    description: "The perfect finishing touch, these classic hoops are lightweight and versatile.",
    price: 65.0,
    image: "https://picsum.photos/600/800?random=21",
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Gold"],
  },
  {
    id: 12,
    name: "Suede Ankle Boots",
    description: "A chic and versatile boot that can be dressed up or down.",
    price: 220.0,
    image: "https://picsum.photos/600/800?random=22",
    category: "Shoes",
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["Taupe", "Black"],
  },
];

export const allSizes = [
  ...new Set(products.flatMap((p) => p.sizes)),
].sort();
export const allColors = [
  ...new Set(products.flatMap((p) => p.colors)),
].sort();
