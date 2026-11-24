import { prisma } from '../config/prisma';

export interface MenuItemData {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  ingredients?: string;
  price: number;
  isVegetarian: boolean;
  isBestseller: boolean;
  isAvailable: boolean;
  prepTimeMinutes: number;
  imageUrl?: string;
  categoryName?: string;
  rating?: number;
  reviewsCount?: number;
}

const memoryMenuItems: MenuItemData[] = [
  // 1. STARTERS
  {
    id: 'starter-1',
    categoryId: 'cat-starters',
    name: 'Truffle & Wild Mushroom Arancini',
    slug: 'truffle-wild-mushroom-arancini',
    price: 650,
    description: 'Crisp Arborio risotto spheres infused with Périgord black truffle, smoked scamorza, and velvety garlic-herb emulsion.',
    ingredients: 'Carnaroli Rice, Black Winter Truffle, Wild Porcini, Scamorza, Garlic Aioli',
    isVegetarian: true,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 18,
    imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Starters',
    rating: 4.9,
    reviewsCount: 142,
  },
  {
    id: 'starter-2',
    categoryId: 'cat-starters',
    name: 'Royal Shahi Galouti Kebab',
    slug: 'royal-shahi-galouti-kebab',
    price: 850,
    description: 'Finely minced pasture-raised lamb marinated in 32 Awadhi spices, smoked with clove and ghee, served on crisp saffron sheermal.',
    ingredients: 'Tender Lamb Mince, Awadhi Potli Spices, Pure Ghee, Saffron Sheermal, Mint Chutney',
    isVegetarian: false,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 22,
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Starters',
    rating: 5.0,
    reviewsCount: 230,
  },
  {
    id: 'starter-3',
    categoryId: 'cat-starters',
    name: 'Citrus Cured Atlantic Salmon Carpaccio',
    slug: 'citrus-cured-atlantic-salmon-carpaccio',
    price: 920,
    description: 'Thinly slivered Norwegian salmon lightly cured with kaffir lime, caper berries, shallot vinaigrette, and micro-sorrel.',
    ingredients: 'Norwegian Salmon, Kaffir Lime, Caper Berries, Cold Pressed Olive Oil, Dill',
    isVegetarian: false,
    isBestseller: false,
    isAvailable: true,
    prepTimeMinutes: 15,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Starters',
    rating: 4.8,
    reviewsCount: 89,
  },
  {
    id: 'starter-4',
    categoryId: 'cat-starters',
    name: 'Charred Saffron Paneer Tikka',
    slug: 'charred-saffron-paneer-tikka',
    price: 620,
    description: 'Farm-fresh cottage cheese steeped in Kashmiri saffron yogurt, cracked yellow mustard, and chargrilled over bhabhar charcoal.',
    ingredients: 'Organic Paneer, Kashmiri Saffron, Hung Curd, Bell Peppers, Degi Mirch',
    isVegetarian: true,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 20,
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Starters',
    rating: 4.9,
    reviewsCount: 178,
  },

  // 2. SOUPS
  {
    id: 'soup-1',
    categoryId: 'cat-soups',
    name: 'Velouté of Roasted Butternut & Thyme',
    slug: 'veloute-roasted-butternut-thyme',
    price: 480,
    description: 'Slow-roasted winter squash puréed with French butter, toasted pumpkin seeds, and aromatic lemon thyme essence.',
    ingredients: 'Butternut Squash, Heavy Crème, Nutmeg, Pumpkin Seed Brittle, Fresh Thyme',
    isVegetarian: true,
    isBestseller: false,
    isAvailable: true,
    prepTimeMinutes: 15,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Soups',
    rating: 4.7,
    reviewsCount: 64,
  },
  {
    id: 'soup-2',
    categoryId: 'cat-soups',
    name: 'Imperial Murgh Yakhni Shorba',
    slug: 'imperial-murgh-yakhni-shorba',
    price: 520,
    description: 'Clarified corn-fed chicken broth simmered for 8 hours with green cardamom, mace, cinnamon bark, and fresh cilantro roots.',
    ingredients: 'Country Chicken Broth, Green Cardamom, Javitri, Coriander Root, Saffron Threads',
    isVegetarian: false,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 15,
    imageUrl: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Soups',
    rating: 4.9,
    reviewsCount: 112,
  },

  // 3. MAIN COURSE
  {
    id: 'main-1',
    categoryId: 'cat-main-course',
    name: 'Sous-Vide Duck Breast with Cherry Port Glaze',
    slug: 'sous-vide-duck-breast-cherry-port',
    price: 1350,
    description: 'Gently cooked duck breast crisped on skin, accompanied by celeriac purée, braised baby carrots, and tart cherry port reduction.',
    ingredients: 'Gressingham Duck Breast, Ruby Port Wine, Morello Cherries, Celeriac, Baby Carrots',
    isVegetarian: false,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 28,
    imageUrl: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Main Course',
    rating: 4.9,
    reviewsCount: 96,
  },
  {
    id: 'main-2',
    categoryId: 'cat-main-course',
    name: 'Pan-Seared Chilean Sea Bass',
    slug: 'pan-seared-chilean-sea-bass',
    price: 1550,
    description: 'Sustainable Chilean sea bass fillet seared in brown butter, served over saffron cauliflower mousseline and caviar champagne emulsion.',
    ingredients: 'Chilean Sea Bass, Oscietra Caviar, Champagne Beurre Blanc, Cauliflower Mousseline',
    isVegetarian: false,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 25,
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Main Course',
    rating: 5.0,
    reviewsCount: 164,
  },

  // 4. INDIAN CUISINE
  {
    id: 'indian-1',
    categoryId: 'cat-indian-cuisine',
    name: 'Royal Feast Signature Dal Makhani',
    slug: 'signature-dal-makhani',
    price: 690,
    description: 'Black urad lentils slow-simmered over charcoal embers for 36 hours with churned white butter, vine-ripened tomatoes, and fenugreek cream.',
    ingredients: 'Organic Black Lentils, Cultured White Butter, San Marzano Puree, Kasuri Methi, Fresh Cream',
    isVegetarian: true,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 15,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Indian Cuisine',
    rating: 5.0,
    reviewsCount: 310,
  },
  {
    id: 'indian-2',
    categoryId: 'cat-indian-cuisine',
    name: 'Nalli Nihari Khaas Awadh',
    slug: 'nalli-nihari-khaas-awadh',
    price: 1150,
    description: 'Marrow-rich tender lamb shanks braised overnight in aromatic stock flavored with rose petals, sandalwood, and royal garam masala.',
    ingredients: 'Baby Lamb Shank, Bone Marrow Jus, Rose Petal Extract, Julienned Ginger, Khamiri Roti',
    isVegetarian: false,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 25,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Indian Cuisine',
    rating: 4.9,
    reviewsCount: 220,
  },
  {
    id: 'indian-4',
    categoryId: 'cat-indian-cuisine',
    name: 'Nizami Dum Biryani with Aged Basmati',
    slug: 'nizami-dum-biryani-aged-basmati',
    price: 980,
    description: 'Two-year aged grain Basmati rice sealed in pastry dough (dum) with tender lamb cubes, saffron milk, fried onions, and mint.',
    ingredients: 'Aged Dehradun Rice, Succulent Lamb, Kashmiri Saffron, Crispy Shallots, Burani Raita',
    isVegetarian: false,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 30,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Indian Cuisine',
    rating: 5.0,
    reviewsCount: 420,
  },

  // 5. CONTINENTAL
  {
    id: 'cont-1',
    categoryId: 'cat-continental',
    name: 'Prime Grass-Fed Tenderloin Steak',
    slug: 'prime-grass-fed-tenderloin-steak',
    price: 1650,
    description: 'Cast-iron seared Angus tenderloin with roasted bone marrow butter, truffled pomme purée, and green peppercorn cognac sauce.',
    ingredients: 'Black Angus Beef, Bone Marrow Butter, Yukon Gold Truffle Mash, Cognac Peppercorn Jus',
    isVegetarian: false,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 25,
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Continental Cuisine',
    rating: 4.9,
    reviewsCount: 154,
  },
  {
    id: 'cont-2',
    categoryId: 'cat-continental',
    name: 'Handcrafted Lobster Ravioli in Bisque',
    slug: 'handcrafted-lobster-ravioli-bisque',
    price: 1250,
    description: 'Fresh egg pasta cushions stuffed with Maine lobster tail and ricotta, finished in a cognac lobster emulsion with tarragon leaves.',
    ingredients: 'Maine Lobster, Ricotta di Bufala, Semolina Pasta, Shellfish Bisque, French Tarragon',
    isVegetarian: false,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 22,
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Continental Cuisine',
    rating: 4.8,
    reviewsCount: 116,
  },

  // 6. DESSERTS
  {
    id: 'dessert-1',
    categoryId: 'cat-desserts',
    name: '24K Edible Gold Chocolate Dome',
    slug: '24k-edible-gold-chocolate-dome',
    price: 750,
    description: 'Valrhona 70% dark chocolate sphere adorned with genuine 24-carat gold leaf, molten raspberry coulis, and Madagascar vanilla bean gelato.',
    ingredients: 'Valrhona Guanaja Chocolate, 24K Edible Gold, Tahitian Vanilla Gelato, Organic Raspberries',
    isVegetarian: true,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 12,
    imageUrl: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Desserts',
    rating: 5.0,
    reviewsCount: 290,
  },
  {
    id: 'dessert-2',
    categoryId: 'cat-desserts',
    name: 'Royal Saffron Shahi Tukda Mille-Feuille',
    slug: 'royal-saffron-shahi-tukda',
    price: 580,
    description: 'Crisp ghee-toasted brioche crisps layered with rabri mousse, Persian pistachio praline, and silver vark embellishment.',
    ingredients: 'Brioche Crisps, Slow-Reduced Rabri, Persian Pistachios, Silver Vark, Cardamom Essence',
    isVegetarian: true,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 14,
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Desserts',
    rating: 4.9,
    reviewsCount: 180,
  },

  // 7. BEVERAGES
  {
    id: 'bev-1',
    categoryId: 'cat-beverages',
    name: 'Royal Saffron & Cardamom Cold Brew',
    slug: 'royal-saffron-cardamom-cold-brew',
    price: 380,
    description: 'Slow-steeped Arabica cold coffee infused with organic saffron stigma, green cardamom pods, and creamy oat milk.',
    ingredients: 'Estate Arabica, Kashmiri Saffron, Cardamom Pods, Oat Milk, Raw Honey',
    isVegetarian: true,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 5,
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Beverages',
    rating: 4.9,
    reviewsCount: 95,
  },
  {
    id: 'bev-3',
    categoryId: 'cat-beverages',
    name: 'Smoked Rosemary Old Fashioned Mocktail',
    slug: 'smoked-rosemary-old-fashioned',
    price: 420,
    description: 'Zero-proof craft blend of charred oak barrel extract, blood orange cordial, Angostura bitters, and table-side smoked rosemary branch.',
    ingredients: 'Charred Oak Extract, Blood Orange Bitters, Demerara Syrup, Smoked Rosemary',
    isVegetarian: true,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 7,
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    categoryName: 'Beverages',
    rating: 5.0,
    reviewsCount: 160,
  },
];

export interface QueryMenuFilters {
  category?: string;
  search?: string;
  isVegetarian?: boolean;
  isBestseller?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'name' | 'featured';
  page?: number;
  limit?: number;
}

export class MenuService {
  static async getItems(filters: QueryMenuFilters = {}) {
    const page = Math.max(1, filters.page || 1);
    const limit = Math.min(50, Math.max(1, filters.limit || 20));

    try {
      const where: any = { isAvailable: true };

      if (filters.category && filters.category !== 'all') {
        where.OR = [
          { categoryId: filters.category },
          { category: { slug: filters.category } },
        ];
      }

      if (filters.isVegetarian !== undefined) {
        where.isVegetarian = filters.isVegetarian;
      }

      if (filters.isBestseller !== undefined) {
        where.isBestseller = filters.isBestseller;
      }

      if (filters.search) {
        const query = filters.search.trim();
        where.OR = [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { ingredients: { contains: query, mode: 'insensitive' } },
        ];
      }

      const orderBy: any = {};
      if (filters.sortBy === 'price-asc') orderBy.price = 'asc';
      else if (filters.sortBy === 'price-desc') orderBy.price = 'desc';
      else if (filters.sortBy === 'name') orderBy.name = 'asc';
      else orderBy.createdAt = 'desc';

      const [total, dbItems] = await Promise.all([
        prisma.menuItem.count({ where }),
        prisma.menuItem.findMany({
          where,
          include: { category: true, images: true },
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      if (total > 0) {
        return {
          items: dbItems.map((item) => ({
            id: item.id,
            categoryId: item.categoryId,
            name: item.name,
            slug: item.slug,
            description: item.description,
            ingredients: item.ingredients || undefined,
            price: Number(item.price),
            isVegetarian: item.isVegetarian,
            isBestseller: item.isBestseller,
            isAvailable: item.isAvailable,
            prepTimeMinutes: item.prepTimeMinutes,
            imageUrl: item.images[0]?.url || '',
            categoryName: item.category.name,
          })),
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
        };
      }
    } catch {}

    // Memory Store Filtering & Search
    let items = [...memoryMenuItems];

    const targetCat = filters.category;
    if (targetCat && targetCat !== 'all') {
      items = items.filter(
        (i) =>
          i.categoryId === targetCat ||
          i.categoryId === `cat-${targetCat}` ||
          i.categoryName?.toLowerCase() === targetCat.toLowerCase()
      );
    }

    if (filters.isVegetarian !== undefined) {
      items = items.filter((i) => i.isVegetarian === filters.isVegetarian);
    }

    if (filters.isBestseller !== undefined) {
      items = items.filter((i) => i.isBestseller === filters.isBestseller);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          (i.ingredients && i.ingredients.toLowerCase().includes(q))
      );
    }

    // Sort
    if (filters.sortBy === 'price-asc') items.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === 'price-desc') items.sort((a, b) => b.price - a.price);
    else if (filters.sortBy === 'rating') items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else items.sort((a, b) => Number(b.isBestseller) - Number(a.isBestseller));

    const total = items.length;
    const paginated = items.slice((page - 1) * limit, page * limit);

    return {
      items: paginated,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getItemById(idOrSlug: string) {
    try {
      const item = await prisma.menuItem.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
        include: {
          category: true,
          images: true,
        },
      });

      if (item) {
        const related = await prisma.menuItem.findMany({
          where: {
            categoryId: item.categoryId,
            id: { not: item.id },
            isAvailable: true,
          },
          take: 3,
          include: { images: true },
        });

        return {
          ...item,
          price: Number(item.price),
          imageUrl: item.images[0]?.url || '',
          related: related.map((r) => ({
            id: r.id,
            name: r.name,
            price: Number(r.price),
            imageUrl: r.images[0]?.url || '',
          })),
        };
      }
    } catch {}

    const item = memoryMenuItems.find(
      (i) => i.id === idOrSlug || i.slug === idOrSlug
    );
    if (!item) throw new Error('Menu item not found');

    const related = memoryMenuItems
      .filter((i) => i.categoryId === item.categoryId && i.id !== item.id)
      .slice(0, 3)
      .map((r) => ({
        id: r.id,
        name: r.name,
        price: r.price,
        imageUrl: r.imageUrl,
      }));

    return { ...item, related };
  }

  static async create(data: {
    categoryId: string;
    name: string;
    slug?: string;
    description: string;
    ingredients?: string;
    price: number;
    isVegetarian?: boolean;
    isBestseller?: boolean;
    isAvailable?: boolean;
    prepTimeMinutes?: number;
    imageUrl?: string;
  }) {
    const slug =
      data.slug ||
      data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    try {
      const newItem = await prisma.menuItem.create({
        data: {
          categoryId: data.categoryId,
          name: data.name.trim(),
          slug,
          description: data.description,
          ingredients: data.ingredients,
          price: data.price,
          isVegetarian: data.isVegetarian ?? false,
          isBestseller: data.isBestseller ?? false,
          isAvailable: data.isAvailable ?? true,
          prepTimeMinutes: data.prepTimeMinutes ?? 20,
          images: data.imageUrl
            ? {
                create: [{ url: data.imageUrl, isPrimary: true }],
              }
            : undefined,
        },
      });
      return newItem;
    } catch {}

    const memoryNew: MenuItemData = {
      id: `item-${Date.now()}`,
      categoryId: data.categoryId,
      name: data.name.trim(),
      slug,
      description: data.description,
      ingredients: data.ingredients,
      price: data.price,
      isVegetarian: data.isVegetarian ?? false,
      isBestseller: data.isBestseller ?? false,
      isAvailable: data.isAvailable ?? true,
      prepTimeMinutes: data.prepTimeMinutes ?? 20,
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviewsCount: 1,
    };
    memoryMenuItems.unshift(memoryNew);
    return memoryNew;
  }

  static async update(id: string, data: Partial<MenuItemData>) {
    try {
      const updated = await prisma.menuItem.update({
        where: { id },
        data: {
          ...data,
          price: data.price !== undefined ? data.price : undefined,
        },
      });
      return updated;
    } catch {}

    const item = memoryMenuItems.find((i) => i.id === id);
    if (!item) throw new Error('Menu item not found');

    Object.assign(item, data);
    return item;
  }

  static async delete(id: string) {
    try {
      await prisma.menuItem.delete({ where: { id } });
      return true;
    } catch {}

    const idx = memoryMenuItems.findIndex((i) => i.id === id);
    if (idx !== -1) {
      memoryMenuItems.splice(idx, 1);
      return true;
    }
    throw new Error('Menu item not found');
  }
}
