import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Layers,
  X,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import api from '../../services/api';

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<any | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/categories');
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCat(null);
    setName('');
    setSlug('');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80');
    setDisplayOrder(categories.length + 1);
    setIsActive(true);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (cat: any) => {
    setEditingCat(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setImageUrl(cat.imageUrl || '');
    setDisplayOrder(cat.displayOrder || 1);
    setIsActive(cat.isActive ?? true);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Category name is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError('');
      const payload = {
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        displayOrder: Number(displayOrder),
        isActive,
      };

      if (editingCat) {
        const res = await api.put(`/categories/${editingCat.id}`, payload);
        if (res.data.success) {
          setCategories((prev) =>
            prev.map((c) => (c.id === editingCat.id ? { ...c, ...payload } : c))
          );
          setIsModalOpen(false);
        }
      } else {
        const res = await api.post('/categories', payload);
        if (res.data.success) {
          setCategories((prev) => [...prev, res.data.data]);
          setIsModalOpen(false);
        }
      }
    } catch (err: any) {
      setFormError(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!window.confirm(`Are you sure you wish to decommission the category "${catName}"?`)) return;

    try {
      const res = await api.delete(`/categories/${id}`);
      if (res.data.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Could not delete category.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
            Gastronomic Taxonomies
          </span>
          <h1 className="text-3xl font-serif text-white mt-1">Menu Categories</h1>
          <p className="text-sm text-neutral-400">
            Structure your culinary offerings into curated collections and courses.
          </p>
        </div>
        <Button onClick={openCreateModal} variant="gold" className="self-start">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl hover:border-[#C6A15B]/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-44 overflow-hidden bg-neutral-950">
                <img
                  src={cat.imageUrl || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge variant={cat.isActive ? 'gold' : 'neutral'}>
                    {cat.isActive ? 'Active Course' : 'Archived'}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono text-neutral-300 border border-neutral-700">
                  Priority #{cat.displayOrder}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C6A15B] font-semibold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>/{cat.slug}</span>
                </div>
                <h3 className="text-xl font-serif text-white mt-1 group-hover:text-[#C6A15B] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-neutral-400 mt-2 line-clamp-2">
                  {cat.description || 'Curated luxury epicurean selection.'}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-neutral-800/80 bg-neutral-950/40 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-mono">ID: {cat.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(cat)}
                  className="p-1.5 hover:bg-neutral-800 rounded text-neutral-400 hover:text-[#C6A15B] transition-colors"
                  title="Edit Category"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-1.5 hover:bg-neutral-800 rounded text-neutral-400 hover:text-rose-400 transition-colors"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-neutral-800 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
                Category Curator
              </span>
              <h2 className="text-2xl font-serif text-white mt-1">
                {editingCat ? `Edit: ${editingCat.name}` : 'New Gastronomy Category'}
              </h2>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-rose-950/40 border border-rose-800/60 rounded-lg text-rose-300 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingCat) {
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  placeholder="e.g. Imperial Starters"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Slug identifier
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="starters"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Display Priority Order
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                    min={1}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                  Banner Imagery URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                  Curation Narrative
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Artisanal preludes curated to awaken the royal palate..."
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="cat-active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="accent-[#C6A15B] w-4 h-4"
                />
                <label htmlFor="cat-active" className="text-sm text-neutral-300">
                  Visible & active on guest digital menu
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="gold" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : editingCat ? 'Update Category' : 'Create Category'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
