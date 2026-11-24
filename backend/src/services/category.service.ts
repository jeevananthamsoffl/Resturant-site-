import { prisma } from '../config/prisma';

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  itemCount?: number;
}

const memoryCategories: CategoryData[] = [
  {
    id: 'cat-starters',
    name: 'Starters',
    slug: 'starters',
    description: 'Imperial appetisers and palate awakeners crafted with rare aromatics.',
    imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'cat-soups',
    name: 'Soups',
    slug: 'soups',
    description: 'Slow-simmered veloutés and Awadhi yakhni broths.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'cat-main-course',
    name: 'Main Course',
    slug: 'main-course',
    description: 'Sous-vide game, Chilean sea bass, and prime cuts with grand reductions.',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    displayOrder: 3,
    isActive: true,
  },
  {
    id: 'cat-indian-cuisine',
    name: 'Indian Cuisine',
    slug: 'indian-cuisine',
    description: '36-hour slow-cooked Awadhi curries, saffron dum biryanis, and tandoor breads.',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    displayOrder: 4,
    isActive: true,
  },
  {
    id: 'cat-continental',
    name: 'Continental Cuisine',
    slug: 'continental',
    description: 'Prime dry-aged steaks, lobster ravioli, and classical European recipes.',
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    displayOrder: 5,
    isActive: true,
  },
  {
    id: 'cat-desserts',
    name: 'Desserts',
    slug: 'desserts',
    description: '24K gold chocolate creations, saffron rabri mille-feuille, and Venetian tiramisu.',
    imageUrl: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80',
    displayOrder: 6,
    isActive: true,
  },
  {
    id: 'cat-beverages',
    name: 'Beverages',
    slug: 'beverages',
    description: 'Saffron cold brew, hibiscus botanical sparklers, and zero-proof smoked cocktails.',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    displayOrder: 7,
    isActive: true,
  },
];

export class CategoryService {
  static async getAll() {
    try {
      const dbCategories = await prisma.category.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: 'asc' },
        include: {
          _count: {
            select: { menuItems: true },
          },
        },
      });

      if (dbCategories.length > 0) {
        return dbCategories.map((c) => ({
          ...c,
          itemCount: c._count.menuItems,
        }));
      }
    } catch {}

    return memoryCategories;
  }

  static async getById(idOrSlug: string) {
    try {
      const dbCat = await prisma.category.findFirst({
        where: {
          OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        },
        include: {
          menuItems: {
            where: { isAvailable: true },
          },
        },
      });
      if (dbCat) return dbCat;
    } catch {}

    const memCat = memoryCategories.find(
      (c) => c.id === idOrSlug || c.slug === idOrSlug
    );
    if (!memCat) throw new Error('Category not found');
    return memCat;
  }

  static async create(data: {
    name: string;
    slug?: string;
    description?: string;
    imageUrl?: string;
    displayOrder?: number;
  }) {
    const slug =
      data.slug ||
      data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    try {
      const newCat = await prisma.category.create({
        data: {
          name: data.name.trim(),
          slug,
          description: data.description,
          imageUrl: data.imageUrl,
          displayOrder: data.displayOrder ?? 0,
        },
      });
      return newCat;
    } catch {}

    const memoryNew: CategoryData = {
      id: `cat-${Date.now()}`,
      name: data.name.trim(),
      slug,
      description: data.description,
      imageUrl: data.imageUrl,
      displayOrder: data.displayOrder ?? memoryCategories.length + 1,
      isActive: true,
    };
    memoryCategories.push(memoryNew);
    return memoryNew;
  }

  static async update(
    id: string,
    data: Partial<{
      name: string;
      slug: string;
      description: string;
      imageUrl: string;
      displayOrder: number;
      isActive: boolean;
    }>
  ) {
    try {
      const updated = await prisma.category.update({
        where: { id },
        data,
      });
      return updated;
    } catch {}

    const cat = memoryCategories.find((c) => c.id === id);
    if (!cat) throw new Error('Category not found');

    Object.assign(cat, data);
    return cat;
  }

  static async delete(id: string) {
    try {
      await prisma.category.delete({ where: { id } });
      return true;
    } catch {}

    const idx = memoryCategories.findIndex((c) => c.id === id);
    if (idx !== -1) {
      memoryCategories.splice(idx, 1);
      return true;
    }
    throw new Error('Category not found');
  }
}
