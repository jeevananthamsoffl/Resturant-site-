export interface MenuItemData {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  ingredients: string[];
  isVegetarian: boolean;
  isBestseller: boolean;
  prepTimeMinutes: number;
  calories: number;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
}

export interface ChefData {
  name: string;
  role: string;
  bio: string;
  accolades: string;
  imageUrl: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string;
  dishRecommended: string;
}

export interface GalleryItemData {
  id: string;
  title: string;
  category: 'Ambiance' | 'Dishes' | 'Chefs' | 'Events';
  imageUrl: string;
  description: string;
}

export const RESTAURANT_INFO = {
  name: 'ROYAL FEAST',
  tagline: 'An Extraordinary Dining Experience',
  shortBio:
    'Royal Feast harmonizes imperial culinary traditions with contemporary gastronomy. Every recipe is an ode to artistry, using rare heritage spices and farm-to-table organic produce.',
  phone: '+91 98765 43210',
  whatsapp: '+919876543210',
  email: 'concierge@royalfeast.com',
  address: '42 Imperial Boulevard, Heritage Quarter, Royal Enclave',
  city: 'Metropolis',
  state: 'Delhi NCR',
  postalCode: '110001',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562095641775!2d77.21827477549996!3d28.612912475676344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b0198031%3A0x6b19a3194a20b080!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  hours: {
    weekday: '12:00 PM – 11:00 PM',
    weekend: '12:00 PM – 11:45 PM',
  },
};

export const MENU_CATEGORIES = [
  { id: 'all', name: 'All Curations' },
  { id: 'starters', name: 'Starters' },
  { id: 'soups', name: 'Soups' },
  { id: 'main-course', name: 'Main Course' },
  { id: 'indian-cuisine', name: 'Indian Cuisine' },
  { id: 'continental', name: 'Continental' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'beverages', name: 'Beverages' },
];

export const MENU_ITEMS: MenuItemData[] = [
  // 1. STARTERS
  {
    id: 'starter-1',
    name: 'Truffle & Wild Mushroom Arancini',
    category: 'starters',
    price: 650,
    description: 'Crisp Arborio risotto spheres infused with Périgord black truffle, smoked scamorza, and velvety garlic-herb emulsion.',
    ingredients: ['Carnaroli Rice', 'Black Winter Truffle', 'Wild Porcini', 'Scamorza', 'Garlic Aioli'],
    isVegetarian: true,
    isBestseller: true,
    prepTimeMinutes: 18,
    calories: 420,
    imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 142,
  },
  {
    id: 'starter-2',
    name: 'Royal Shahi Galouti Kebab',
    category: 'starters',
    price: 850,
    description: 'Finely minced pasture-raised lamb marinated in 32 Awadhi spices, smoked with clove and ghee, served on crisp saffron sheermal.',
    ingredients: ['Tender Lamb Mince', 'Awadhi Potli Spices', 'Pure Ghee', 'Saffron Sheermal', 'Mint Chutney'],
    isVegetarian: false,
    isBestseller: true,
    prepTimeMinutes: 22,
    calories: 510,
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 230,
  },
  {
    id: 'starter-3',
    name: 'Citrus Cured Atlantic Salmon Carpaccio',
    category: 'starters',
    price: 920,
    description: 'Thinly slivered Norwegian salmon lightly cured with kaffir lime, caper berries, shallot vinaigrette, and micro-sorrel.',
    ingredients: ['Norwegian Salmon', 'Kaffir Lime', 'Caper Berries', 'Cold Pressed Olive Oil', 'Dill'],
    isVegetarian: false,
    isBestseller: false,
    prepTimeMinutes: 15,
    calories: 310,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 89,
  },
  {
    id: 'starter-4',
    name: 'Charred Saffron Paneer Tikka',
    category: 'starters',
    price: 620,
    description: 'Farm-fresh cottage cheese steeped in Kashmiri saffron yogurt, cracked yellow mustard, and chargrilled over bhabhar charcoal.',
    ingredients: ['Organic Paneer', 'Kashmiri Saffron', 'Hung Curd', 'Bell Peppers', 'Degi Mirch'],
    isVegetarian: true,
    isBestseller: true,
    prepTimeMinutes: 20,
    calories: 440,
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 178,
  },

  // 2. SOUPS
  {
    id: 'soup-1',
    name: 'Velouté of Roasted Butternut & Thyme',
    category: 'soups',
    price: 480,
    description: 'Slow-roasted winter squash puréed with French butter, toasted pumpkin seeds, and aromatic lemon thyme essence.',
    ingredients: ['Butternut Squash', 'Heavy Crème', 'Nutmeg', 'Pumpkin Seed Brittle', 'Fresh Thyme'],
    isVegetarian: true,
    isBestseller: false,
    prepTimeMinutes: 15,
    calories: 260,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 64,
  },
  {
    id: 'soup-2',
    name: 'Imperial Murgh Yakhni Shorba',
    category: 'soups',
    price: 520,
    description: 'Clarified corn-fed chicken broth simmered for 8 hours with green cardamom, mace, cinnamon bark, and fresh cilantro roots.',
    ingredients: ['Country Chicken Broth', 'Green Cardamom', 'Javitri', 'Coriander Root', 'Saffron Threads'],
    isVegetarian: false,
    isBestseller: true,
    prepTimeMinutes: 15,
    calories: 220,
    imageUrl: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 112,
  },
  {
    id: 'soup-3',
    name: 'Classic French Bouillabaisse Elegance',
    category: 'soups',
    price: 680,
    description: 'Provençal saffron seafood bisque with wild prawns, calamari, fennel bulb, and crisp baguette rouille.',
    ingredients: ['Tiger Prawns', 'Calamari', 'Fennel Broth', 'Rouille Toast', 'Spanish Saffron'],
    isVegetarian: false,
    isBestseller: false,
    prepTimeMinutes: 20,
    calories: 340,
    imageUrl: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 75,
  },

  // 3. MAIN COURSE
  {
    id: 'main-1',
    name: 'Sous-Vide Duck Breast with Cherry Port Glaze',
    category: 'main-course',
    price: 1350,
    description: 'Gently cooked duck breast crisped on skin, accompanied by celeriac purée, braised baby carrots, and tart cherry port reduction.',
    ingredients: ['Gressingham Duck Breast', 'Ruby Port Wine', 'Morello Cherries', 'Celeriac', 'Baby Carrots'],
    isVegetarian: false,
    isBestseller: true,
    prepTimeMinutes: 28,
    calories: 680,
    imageUrl: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 96,
  },
  {
    id: 'main-2',
    name: 'Pan-Seared Chilean Sea Bass',
    category: 'main-course',
    price: 1550,
    description: 'Sustainable Chilean sea bass fillet seared in brown butter, served over saffron cauliflower mousseline and caviar champagne emulsion.',
    ingredients: ['Chilean Sea Bass', 'Oscietra Caviar', 'Champagne Beurre Blanc', 'Cauliflower Mousseline'],
    isVegetarian: false,
    isBestseller: true,
    prepTimeMinutes: 25,
    calories: 520,
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 164,
  },
  {
    id: 'main-3',
    name: 'Forest Morel & Asparagus Risotto',
    category: 'main-course',
    price: 950,
    description: 'Himalayan wild morels and tender green asparagus folded into creamy Acquerello rice with 24-month aged Parmigiano Reggiano.',
    ingredients: ['Acquerello Carnaroli Rice', 'Kashmiri Morels', 'Asparagus Spears', 'Parmigiano Reggiano', 'White Truffle Butter'],
    isVegetarian: true,
    isBestseller: false,
    prepTimeMinutes: 22,
    calories: 580,
    imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 88,
  },

  // 4. INDIAN CUISINE
  {
    id: 'indian-1',
    name: 'Royal Feast Signature Dal Makhani',
    category: 'indian-cuisine',
    price: 690,
    description: 'Black urad lentils slow-simmered over charcoal embers for 36 hours with churned white butter, vine-ripened tomatoes, and fenugreek cream.',
    ingredients: ['Organic Black Lentils', 'Cultured White Butter', 'San Marzano Puree', 'Kasuri Methi', 'Fresh Cream'],
    isVegetarian: true,
    isBestseller: true,
    prepTimeMinutes: 15,
    calories: 540,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 310,
  },
  {
    id: 'indian-2',
    name: 'Nalli Nihari Khaas Awadh',
    category: 'indian-cuisine',
    price: 1150,
    description: 'Marrow-rich tender lamb shanks braised overnight in aromatic stock flavored with rose petals, sandalwood, and royal garam masala.',
    ingredients: ['Baby Lamb Shank', 'Bone Marrow Jus', 'Rose Petal Extract', 'Julienned Ginger', 'Khamiri Roti'],
    isVegetarian: false,
    isBestseller: true,
    prepTimeMinutes: 25,
    calories: 780,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 220,
  },
  {
    id: 'indian-3',
    name: 'Murgh Makhani Grand Cru',
    category: 'indian-cuisine',
    price: 880,
    description: 'Tandoor-charred chicken supreme simmered in velvety satin tomato sauce with cold-pressed mustard oil, organic honey, and dried fenugreek.',
    ingredients: ['Free-Range Chicken', 'Plum Tomato Gravy', 'Cold Pressed Mustard Oil', 'Wild Honey', 'Makhana Butter'],
    isVegetarian: false,
    isBestseller: true,
    prepTimeMinutes: 20,
    calories: 690,
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 275,
  },
  {
    id: 'indian-4',
    name: 'Nizami Dum Biryani with Aged Basmati',
    category: 'indian-cuisine',
    price: 980,
    description: 'Two-year aged grain Basmati rice sealed in pastry dough (dum) with tender lamb cubes, saffron milk, fried onions, and mint.',
    ingredients: ['Aged Dehradun Rice', 'Succulent Lamb', 'Kashmiri Saffron', 'Crispy Shallots', 'Burani Raita'],
    isVegetarian: false,
    isBestseller: true,
    prepTimeMinutes: 30,
    calories: 820,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 420,
  },

  // 5. CONTINENTAL
  {
    id: 'cont-1',
    name: 'Prime Grass-Fed Tenderloin Steak',
    category: 'continental',
    price: 1650,
    description: 'Cast-iron seared Angus tenderloin with roasted bone marrow butter, truffled pomme purée, and green peppercorn cognac sauce.',
    ingredients: ['Black Angus Beef', 'Bone Marrow Butter', 'Yukon Gold Truffle Mash', 'Cognac Peppercorn Jus'],
    isVegetarian: false,
    isBestseller: true,
    prepTimeMinutes: 25,
    calories: 760,
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 154,
  },
  {
    id: 'cont-2',
    name: 'Handcrafted Lobster Ravioli in Bisque',
    category: 'continental',
    price: 1250,
    description: 'Fresh egg pasta cushions stuffed with Maine lobster tail and ricotta, finished in a cognac lobster emulsion with tarragon leaves.',
    ingredients: ['Maine Lobster', 'Ricotta di Bufala', 'Semolina Pasta', 'Shellfish Bisque', 'French Tarragon'],
    isVegetarian: false,
    isBestseller: true,
    prepTimeMinutes: 22,
    calories: 590,
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 116,
  },
  {
    id: 'cont-3',
    name: 'Wild Mushroom Stroganoff on Fettuccine',
    category: 'continental',
    price: 820,
    description: 'Chanterelles, shiitake, and button mushrooms sautéed with Dijon mustard, sour cream, and fresh dill over bronze-die fettuccine.',
    ingredients: ['Shiitake Mushrooms', 'Chanterelles', 'Dijon Mustard', 'Crème Fraîche', 'Bronze-Die Pasta'],
    isVegetarian: true,
    isBestseller: false,
    prepTimeMinutes: 20,
    calories: 510,
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281744?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 68,
  },

  // 6. DESSERTS
  {
    id: 'dessert-1',
    name: '24K Edible Gold Chocolate Dome',
    category: 'desserts',
    price: 750,
    description: 'Valrhona 70% dark chocolate sphere adorned with genuine 24-carat gold leaf, molten raspberry coulis, and Madagascar vanilla bean gelato.',
    ingredients: ['Valrhona Guanaja Chocolate', '24K Edible Gold', 'Tahitian Vanilla Gelato', 'Organic Raspberries'],
    isVegetarian: true,
    isBestseller: true,
    prepTimeMinutes: 12,
    calories: 490,
    imageUrl: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 290,
  },
  {
    id: 'dessert-2',
    name: 'Royal Saffron Shahi Tukda Mille-Feuille',
    category: 'desserts',
    price: 580,
    description: 'Crisp ghee-toasted brioche crisps layered with rabri mousse, Persian pistachio praline, and silver vark embellishment.',
    ingredients: ['Brioche Crisps', 'Slow-Reduced Rabri', 'Persian Pistachios', 'Silver Vark', 'Cardamom Essence'],
    isVegetarian: true,
    isBestseller: true,
    prepTimeMinutes: 14,
    calories: 460,
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 180,
  },
  {
    id: 'dessert-3',
    name: 'Classic Venetian Tiramisù Grand Cru',
    category: 'desserts',
    price: 620,
    description: 'Espresso-soaked Savoiardi biscuits layered with silky mascarpone zabaglione, dusted with raw Belgian cocoa powder.',
    ingredients: ['Mascarpone Cheese', 'Savoiardi Ladyfingers', 'Arabica Espresso', 'Marsala Wine', 'Callebaut Cocoa'],
    isVegetarian: true,
    isBestseller: false,
    prepTimeMinutes: 10,
    calories: 440,
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 140,
  },

  // 7. BEVERAGES
  {
    id: 'bev-1',
    name: 'Royal Saffron & Cardamom Cold Brew',
    category: 'beverages',
    price: 380,
    description: 'Slow-steeped Arabica cold coffee infused with organic saffron stigma, green cardamom pods, and creamy oat milk.',
    ingredients: ['Estate Arabica', 'Kashmiri Saffron', 'Cardamom Pods', 'Oat Milk', 'Raw Honey'],
    isVegetarian: true,
    isBestseller: true,
    prepTimeMinutes: 5,
    calories: 140,
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 95,
  },
  {
    id: 'bev-2',
    name: 'Imperial Hibiscus & Rose Petal Cooler',
    category: 'beverages',
    price: 340,
    description: 'Sparkling botanic refresher crafted from wild dried hibiscus flowers, Kannauj rose water, lime, and crushed mint.',
    ingredients: ['Wild Hibiscus', 'Organic Rose Water', 'Fleur de Sel', 'Sparkling Mineral Water', 'Mint'],
    isVegetarian: true,
    isBestseller: false,
    prepTimeMinutes: 5,
    calories: 90,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 72,
  },
  {
    id: 'bev-3',
    name: 'Smoked Smoked Rosemary Old Fashioned Mocktail',
    category: 'beverages',
    price: 420,
    description: 'Zero-proof craft blend of charred oak barrel extract, blood orange cordial, Angostura bitters, and table-side smoked rosemary branch.',
    ingredients: ['Charred Oak Extract', 'Blood Orange Bitters', 'Demerara Syrup', 'Smoked Rosemary'],
    isVegetarian: true,
    isBestseller: true,
    prepTimeMinutes: 7,
    calories: 110,
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 160,
  },
];

export const CHEFS: ChefData[] = [
  {
    name: 'Chef Antoine Laurent',
    role: 'Culinary Director & Executive Chef',
    bio: 'Former sous-chef at Le Gavroche Paris and recipient of the Order of Culinary Merit. Brings 22 years of high French fine-dining precision and contemporary flair.',
    accolades: '2x Michelin Guide Featured • Maître Cuisinier de France',
    imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Chef Vikramaditya Rathore',
    role: 'Master of Heritage & Tandoor',
    bio: 'Guardian of Awadhi and Rajputana regal recipes handed down across four generations. Renowned for his mastery of 48-hour slow-dum techniques and secret royal spice blends.',
    accolades: 'Best Indian Specialty Chef 2024 • Awadh Culinary Ambassador',
    imageUrl: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Elena Rostova',
    role: 'Head Pastry Chef & Chocolatier',
    bio: 'Trained at École Ducasse Paris, Chef Elena designs architectural confectionery and sensory desserts combining delicate European patisserie with exotic Oriental aromas.',
    accolades: 'World Pastry Cup Finalist • Artisan Chocolatier of the Year',
    imageUrl: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=800&q=80',
  },
];

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: 't-1',
    name: 'Lord Arthur Sterling',
    role: 'Gastronomy Critic, Luxe Epicure',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    comment:
      'Royal Feast is not merely dinner; it is an operatic culinary triumph. The Shahi Galouti melts before touching the tongue, and the 24K Gold Chocolate dome is breathtaking.',
    date: 'November 2026',
    dishRecommended: 'Royal Shahi Galouti Kebab',
  },
  {
    id: 't-2',
    name: 'Meera Deshmukh',
    role: 'Food & Wine Editor, Vogue Living',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    comment:
      'The ambiance transports you to a modern Mughal palace with Parisian subtlety. The 36-hour Dal Makhani ruined all other lentil preparations for me forever. Magnificent.',
    date: 'October 2026',
    dishRecommended: 'Signature Dal Makhani',
  },
  {
    id: 't-3',
    name: 'Chef Julian Martinez',
    role: 'Visiting Sommelier, Madrid',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    comment:
      'Unsurpassed attention to detail. Every course arrived at the precise temperature with poetic plating. The wine pairing curation and hospitable service are world-class.',
    date: 'September 2026',
    dishRecommended: 'Chilean Sea Bass',
  },
];

export const GALLERY_ITEMS: GalleryItemData[] = [
  {
    id: 'g-1',
    title: 'The Imperial Grand Dining Hall',
    category: 'Ambiance',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    description: 'Chandeliers of Bohemian crystal suspended over hand-carved mahogany tables.',
  },
  {
    id: 'g-2',
    title: '24K Edible Gold Chocolate Dome',
    category: 'Dishes',
    imageUrl: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=80',
    description: 'Valrhona 70% dark chocolate orb dusted with genuine 24-carat gold leaf.',
  },
  {
    id: 'g-3',
    title: 'Executive Chef Plating in Live Kitchen',
    category: 'Chefs',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    description: 'Culinary perfection achieved through intense focus and micro-tweezer garnishing.',
  },
  {
    id: 'g-4',
    title: 'Private VIP Champagne Lounge',
    category: 'Ambiance',
    imageUrl: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
    description: 'An exclusive sanctuary designed for diplomatic dinners and intimate celebrations.',
  },
  {
    id: 'g-5',
    title: 'Pan-Seared Chilean Sea Bass',
    category: 'Dishes',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    description: 'Served with Oscietra caviar and champagne beurre blanc.',
  },
  {
    id: 'g-6',
    title: 'Autumn Wine Tasting Gala',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    description: 'Exclusive vintage uncorking accompanied by live classical cello and violin.',
  },
  {
    id: 'g-7',
    title: 'Heritage Charcoal Tandoor Mastery',
    category: 'Chefs',
    imageUrl: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=1200&q=80',
    description: 'Traditional charcoal techniques unlocking aromas unachievable on modern grills.',
  },
  {
    id: 'g-8',
    title: 'The Royal Terrace Under Starlight',
    category: 'Ambiance',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    description: 'Open-sky dining overlooking the heritage gardens and water fountains.',
  },
  {
    id: 'g-9',
    title: 'Lobster Ravioli in Saffron Bisque',
    category: 'Dishes',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
    description: 'Handcrafted daily with fresh Maine lobster tail and creamy buffalo ricotta.',
  },
];
