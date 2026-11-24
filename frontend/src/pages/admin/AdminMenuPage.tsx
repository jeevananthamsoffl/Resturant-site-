import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  X,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import api from '../../services/api';

export const AdminMenuPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState<number>(500);
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(20);
  const [imageUrl, setImageUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [menuRes, catRes] = await Promise.all([
        api.get('/menu?limit=50'),
        api.get('/categories'),
      ]);
      if (menuRes.data.success) setItems(menuRes.data.data);
      if (catRes.data.success) {
        setCategories(catRes.data.data);
        if (catRes.data.data.length > 0) setCategoryId(catRes.data.data[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setName('');
    setPrice(650);
    setDescription('');
    setIngredients('');
    setIsVegetarian(false);
    setIsBestseller(false);
    setIsAvailable(true);
    setPrepTimeMinutes(20);
    setImageUrl('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setName(item.name);
    setCategoryId(item.categoryId);
    setPrice(item.price);
    setDescription(item.description);
    setIngredients(item.ingredients || '');
    setIsVegetarian(item.isVegetarian);
    setIsBestseller(item.isBestseller);
    setIsAvailable(item.isAvailable);
    setPrepTimeMinutes(item.prepTimeMinutes || 20);
    setImageUrl(item.imageUrl || '');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSaveDish = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      categoryId,
      price: Number(price),
      description: description.trim(),
      ingredients: ingredients.trim(),
      isVegetarian,
      isBestseller,
      isAvailable,
      prepTimeMinutes: Number(prepTimeMinutes),
      imageUrl: imageUrl.trim(),
    };

    try {
      if (editingItem) {
        await api.put(`/menu/${editingItem.id}`, payload);
      } else {
        await api.post('/menu', payload);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      setFormError(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDish = async (id: string, dishName: string) => {
    if (!window.confirm(`Are you certain you wish to remove "${dishName}" from the menu?`)) return;
    try {
      await api.delete(`/menu/${id}`);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const toggleAvailability = async (item: any) => {
    try {
      await api.put(`/menu/${item.id}`, { isAvailable: !item.isAvailable });
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isAvailable: !i.isAvailable } : i))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const toggleBestseller = async (item: any) => {
    try {
      await api.put(`/menu/${item.id}`, { isBestseller: !item.isBestseller });
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, isBestseller: !i.isBestseller } : i))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.categoryId === selectedCat;
    const matchesSearch =
      search.trim() === '' ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <Badge variant="gold" size="sm" className="mb-1">
            Culinary Catalog
          </Badge>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Digital Menu Management
          </h1>
          <p className="text-xs text-royal-muted font-light">
            Manage recipes, prices, noble ingredients, and dietary indicators.
          </p>
        </div>

        <Button variant="gold" size="sm" onClick={openCreateModal} icon={Plus}>
          Add New Dish
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-royal-charcoal p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-royal-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dish or ingredients..."
            className="w-full bg-royal-dark border border-white/10 rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-royal-gold"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-royal-muted">Category:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-royal-dark border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-royal-gold cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Items Table */}
      <div className="bg-royal-charcoal rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-royal-muted">
            <thead className="bg-royal-dark/80 text-white uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Dish</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Dietary</th>
                <th className="p-4">Bestseller</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredItems.map((dish) => (
                <tr key={dish.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        className="w-12 h-12 rounded object-cover border border-royal-gold/20 shrink-0"
                      />
                      <div className="min-w-0 max-w-xs">
                        <p className="font-bold text-white text-sm truncate">{dish.name}</p>
                        <p className="text-[11px] text-royal-muted line-clamp-1">{dish.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white font-medium">
                    {dish.categoryName || 'Curated'}
                  </td>
                  <td className="p-4 font-mono font-bold text-royal-gold text-sm">
                    {formatCurrency(dish.price)}
                  </td>
                  <td className="p-4">
                    {dish.isVegetarian ? (
                      <Badge variant="veg">Vegetarian</Badge>
                    ) : (
                      <Badge variant="non-veg">Non-Veg</Badge>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleBestseller(dish)}
                      className={`p-1.5 rounded transition-colors ${
                        dish.isBestseller
                          ? 'text-royal-gold hover:text-white'
                          : 'text-white/20 hover:text-white/60'
                      }`}
                      title="Toggle Bestseller status"
                    >
                      <Star className={`w-4 h-4 ${dish.isBestseller ? 'fill-royal-gold' : ''}`} />
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleAvailability(dish)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full transition-all border ${
                        dish.isAvailable
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
                          : 'bg-rose-950/60 text-rose-400 border-rose-500/40'
                      }`}
                    >
                      {dish.isAvailable ? 'Available' : 'Sold Out'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(dish)}
                        className="p-1.5 text-royal-muted hover:text-royal-gold transition-colors"
                        title="Edit Dish"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDish(dish.id, dish.name)}
                        className="p-1.5 text-royal-muted hover:text-rose-400 transition-colors"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Dish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-royal-charcoal border border-royal-gold/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingItem ? 'Edit Culinary Creation' : 'Add New Noble Dish'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-royal-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <p className="text-xs text-rose-400 bg-rose-950/60 p-2.5 rounded border border-rose-800">
                {formError}
              </p>
            )}

            <form onSubmit={handleSaveDish} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-royal-muted mb-1 font-medium">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Wagyu A5 Tournedos"
                    className="w-full bg-royal-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-royal-gold"
                  />
                </div>

                <div>
                  <label className="block uppercase text-royal-muted mb-1 font-medium">
                    Category *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-royal-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-royal-gold cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase text-royal-muted mb-1 font-medium">
                    Price (₹ INR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-royal-dark border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-royal-gold"
                  />
                </div>

                <div>
                  <label className="block uppercase text-royal-muted mb-1 font-medium">
                    Prep Time (Minutes)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={prepTimeMinutes}
                    onChange={(e) => setPrepTimeMinutes(Number(e.target.value))}
                    className="w-full bg-royal-dark border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-royal-gold"
                  />
                </div>

                <div>
                  <label className="block uppercase text-royal-muted mb-1 font-medium">
                    Dietary Classification
                  </label>
                  <select
                    value={isVegetarian ? 'veg' : 'non-veg'}
                    onChange={(e) => setIsVegetarian(e.target.value === 'veg')}
                    className="w-full bg-royal-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-royal-gold cursor-pointer"
                  >
                    <option value="non-veg">Non-Vegetarian</option>
                    <option value="veg">Vegetarian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase text-royal-muted mb-1 font-medium">
                  High-Resolution Food Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-royal-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-royal-gold"
                />
              </div>

              <div>
                <label className="block uppercase text-royal-muted mb-1 font-medium">
                  Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Artisanal description of the preparation and flavor notes..."
                  className="w-full bg-royal-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-royal-gold"
                />
              </div>

              <div>
                <label className="block uppercase text-royal-muted mb-1 font-medium">
                  Ingredients (Comma Separated)
                </label>
                <input
                  type="text"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g. Périgord Truffle, Acquerello Rice, 24-Mo Parmesan"
                  className="w-full bg-royal-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-royal-gold"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-white">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={(e) => setIsBestseller(e.target.checked)}
                    className="accent-royal-gold w-4 h-4"
                  />
                  <span>Mark as Signature Bestseller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-white">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                    className="accent-royal-gold w-4 h-4"
                  />
                  <span>Currently Available in Kitchen</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="gold" size="sm" isLoading={isSubmitting}>
                  {editingItem ? 'Save Updates' : 'Add Dish to Menu'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
