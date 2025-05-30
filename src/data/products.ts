import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Radiance Facial Serum",
    description: "Our bestselling facial serum is packed with organic vitamin C and hyaluronic acid to brighten and hydrate your skin. This lightweight formula absorbs quickly, leaving your skin glowing and refreshed.",
    price: 48.00,
    discount: 0,
    image: "https://images.pexels.com/photos/6621349/pexels-photo-6621349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Skin Care",
    rating: 5,
    reviews: 124,
    isNew: false,
    ingredients: ["Organic Aloe Vera", "Hyaluronic Acid", "Vitamin C", "Jojoba Oil", "Rosehip Extract"],
    benefits: ["Brightens skin tone", "Reduces fine lines", "Deeply hydrates", "Improves elasticity"],
    howToUse: "Apply 3-4 drops to clean skin morning and evening. Gently pat into face and neck, followed by moisturizer.",
    herbsUsed: ["Rosehip", "Chamomile", "Green Tea"]
  },
  {
    id: 2,
    name: "Hydrating Rose Clay Mask",
    description: "This gentle clay mask detoxifies while maintaining moisture balance. Infused with rose petals and organic honey, it soothes and rejuvenates tired skin for a refreshed complexion.",
    price: 38.00,
    discount: 15,
    discountPrice: 32.30,
    image: "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Skin Care",
    rating: 4,
    reviews: 86,
    isNew: false,
    ingredients: ["Pink Kaolin Clay", "Rose Petal Powder", "Organic Honey", "Aloe Vera", "Calendula Extract"],
    benefits: ["Detoxifies pores", "Balances oil production", "Soothes redness", "Improves skin texture"],
    howToUse: "Apply an even layer to clean, damp skin. Leave on for 10-15 minutes. Rinse thoroughly with warm water. Use 1-2 times weekly.",
    herbsUsed: ["Rose", "Calendula", "Lavender"]
  },
  {
    id: 3,
    name: "Nourishing Lip Balm Trio",
    description: "A set of three luxurious lip balms made with organic shea butter and essential oils. Keeps lips soft and protected throughout the day with natural flavors: mint, berry, and vanilla.",
    price: 24.00,
    discount: 0,
    image: "https://images.pexels.com/photos/6690933/pexels-photo-6690933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Lip Care",
    rating: 5,
    reviews: 58,
    isNew: true,
    ingredients: ["Organic Shea Butter", "Beeswax", "Coconut Oil", "Vitamin E", "Essential Oils"],
    benefits: ["Deeply moisturizes", "Prevents chapping", "Soothes dry lips", "Natural UV protection"],
    howToUse: "Apply to lips as needed throughout the day. Can be used under lipstick as a moisturizing base.",
    herbsUsed: ["Mint", "Vanilla Bean", "Rose"]
  },
  {
    id: 4,
    name: "Botanical Hair Repair Oil",
    description: "This restorative hair oil blend combines argan, jojoba and rosemary to strengthen damaged hair and add natural shine without weighing it down. Perfect for all hair types.",
    price: 36.00,
    discount: 0,
    image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Hair Care",
    rating: 4,
    reviews: 42,
    isNew: false,
    ingredients: ["Argan Oil", "Jojoba Oil", "Rosemary Essential Oil", "Vitamin E", "Almond Oil"],
    benefits: ["Repairs damaged ends", "Adds natural shine", "Strengthens hair", "Promotes growth"],
    howToUse: "Apply a few drops to damp or dry hair, focusing on ends. Can be used as an overnight treatment for intensive repair.",
    herbsUsed: ["Rosemary", "Lavender", "Thyme"]
  },
  {
    id: 5,
    name: "Rejuvenating Eye Cream",
    description: "Target fine lines and dark circles with our gentle yet effective eye cream. Formulated with caffeine and peptides to reduce puffiness and brighten the delicate eye area.",
    price: 42.00,
    discount: 10,
    discountPrice: 37.80,
    image: "https://images.pexels.com/photos/7262997/pexels-photo-7262997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Skincare",
    rating: 5,
    reviews: 73,
    isNew: false,
    ingredients: ["Peptide Complex", "Caffeine", "Hyaluronic Acid", "Green Tea Extract", "Shea Butter"],
    benefits: ["Reduces dark circles", "Minimizes fine lines", "Decreases puffiness", "Hydrates delicate skin"],
    howToUse: "Using ring finger, gently pat a small amount around the orbital bone morning and evening. Avoid direct contact with eyes.",
    herbsUsed: ["Green Tea", "Cucumber", "Chamomile"]
  },
  {
    id: 6,
    name: "Calming Lavender Body Oil",
    description: "This luxurious body oil absorbs quickly to nourish dry skin while the calming scent of organic lavender helps reduce stress and promote relaxation. Perfect for evening self-care.",
    price: 32.00,
    discount: 0,
    image: "https://images.pexels.com/photos/6621329/pexels-photo-6621329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Body Care",
    rating: 4,
    reviews: 38,
    isNew: true,
    ingredients: ["Sweet Almond Oil", "Organic Lavender Essential Oil", "Vitamin E", "Jojoba Oil", "Chamomile Extract"],
    benefits: ["Deeply moisturizes", "Promotes relaxation", "Improves skin elasticity", "Reduces stress"],
    howToUse: "Apply to damp skin after showering. For maximum relaxation benefits, use in the evening before bed.",
    herbsUsed: ["Lavender", "Chamomile", "Ylang Ylang"]
  },
  {
    id: 7,
    name: "Purifying Charcoal Face Cleanser",
    description: "This gentle yet effective cleanser uses activated charcoal to draw out impurities while maintaining your skin's natural moisture balance. Leaves skin clean and refreshed.",
    price: 28.00,
    discount: 0,
    image: "https://images.pexels.com/photos/6621441/pexels-photo-6621441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Skincare",
    rating: 4,
    reviews: 64,
    isNew: false,
    ingredients: ["Activated Charcoal", "Aloe Vera", "Tea Tree Oil", "Glycerin", "Coconut-Derived Cleansers"],
    benefits: ["Removes impurities", "Balances oil production", "Prevents breakouts", "Maintains moisture balance"],
    howToUse: "Massage onto damp skin in circular motions. Rinse thoroughly with warm water. Use morning and evening.",
    herbsUsed: ["Tea Tree", "Mint", "Eucalyptus"]
  },
  {
    id: 8,
    name: "Brightening Vitamin C Moisturizer",
    description: "This lightweight daily moisturizer is enriched with stabilized Vitamin C to brighten skin tone and protect against environmental damage while providing all-day hydration.",
    price: 44.00,
    discount: 0,
    image: "https://images.pexels.com/photos/6621425/pexels-photo-6621425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Skincare",
    rating: 5,
    reviews: 91,
    isNew: true,
    ingredients: ["Stabilized Vitamin C", "Hyaluronic Acid", "Squalane", "Green Tea Extract", "Aloe Vera"],
    benefits: ["Brightens complexion", "Protects against free radicals", "Hydrates all day", "Improves skin tone"],
    howToUse: "Apply to clean face and neck morning and evening. Can be used under makeup.",
    herbsUsed: ["Green Tea", "Licorice Root", "Gotu Kola"]
  }
];

export const featuredProducts = products.filter(product => 
  [1, 3, 5, 8].includes(product.id)
);

export const categories = [...new Set(products.map(product => product.category))];

export const priceRanges = [
  { id: 'under30', label: 'Under $30', min: 0, max: 30 },
  { id: '30to50', label: '$30 - $50', min: 30, max: 50 },
  { id: 'over50', label: 'Over $50', min: 50, max: 1000 }
];