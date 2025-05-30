import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types';
import { uploadService } from '../../services/uploadService';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Partial<Product>) => void;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    stock: product?.stock || 0,
    categories: product?.categories || [],
    images: product?.images || [],
    herbs: product?.herbs || [],
    ingredients: product?.ingredients || [],
    benefits: product?.benefits || [],
    type: product?.type || null,
    how_to_use: product?.how_to_use || [],
    is_active: product?.is_active ?? true
  });

  const [newImage, setNewImage] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newHerb, setNewHerb] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newHowToUse, setNewHowToUse] = useState('');
  const [imageUploadMethod, setImageUploadMethod] = useState<'url' | 'upload'>('url');
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: checked !== undefined ? checked : value
    }));
  };

  const handleArrayAdd = (field: keyof typeof formData, value: string, setValue: (value: string) => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
      setValue('');
    }
  };

  const handleArrayRemove = (field: keyof typeof formData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleImageMethodChange = (method: 'url' | 'upload') => {
    setImageUploadMethod(method);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setIsUploading(true);
    const files = Array.from(e.target.files);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const url = await uploadService.uploadImage(file);
        uploadedUrls.push(url);
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price.toString())
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-medium text-secondary-800">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Type</label>
              <select
                name="type"
                value={formData.type || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="">Regular Product</option>
                <option value="Featured Product">Featured Product</option>
                <option value="Best Seller">Best Seller</option>
                <option value="New Product">New Product</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                required
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-gray-700 mb-2">Images</label>
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleImageMethodChange('url')}
                  className={`px-4 py-2 rounded-md ${
                    imageUploadMethod === 'url' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Enter URL
                </button>
                <button
                  type="button"
                  onClick={() => handleImageMethodChange('upload')}
                  className={`px-4 py-2 rounded-md ${
                    imageUploadMethod === 'upload' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Upload Image
                </button>
              </div>

              {imageUploadMethod === 'url' ? (
                <div className="flex gap-4">
                  <input
                    type="url"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="Enter image URL"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayAdd('images', newImage, setNewImage)}
                    className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  >
                    Add Image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary-50 file:text-primary-700
                      hover:file:bg-primary-100"
                  />
                  {isUploading && (
                    <div className="text-center text-gray-600">
                      Uploading images...
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleArrayRemove('images', index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-gray-700 mb-2">Categories</label>
            <div className="flex gap-4 mb-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <button
                type="button"
                onClick={() => handleArrayAdd('categories', newCategory, setNewCategory)}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Add Category
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{category}</span>
                  <button
                    type="button"
                    onClick={() => handleArrayRemove('categories', index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Herbs */}
          <div>
            <label className="block text-gray-700 mb-2">Herbs</label>
            <div className="flex gap-4 mb-2">
              <input
                type="text"
                value={newHerb}
                onChange={(e) => setNewHerb(e.target.value)}
                placeholder="Enter herb"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <button
                type="button"
                onClick={() => handleArrayAdd('herbs', newHerb, setNewHerb)}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Add Herb
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.herbs.map((herb, index) => (
                <div
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{herb}</span>
                  <button
                    type="button"
                    onClick={() => handleArrayRemove('herbs', index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-gray-700 mb-2">Ingredients</label>
            <div className="flex gap-4 mb-2">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Enter ingredient"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <button
                type="button"
                onClick={() => handleArrayAdd('ingredients', newIngredient, setNewIngredient)}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Add Ingredient
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{ingredient}</span>
                  <button
                    type="button"
                    onClick={() => handleArrayRemove('ingredients', index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-gray-700 mb-2">Benefits</label>
            <div className="flex gap-4 mb-2">
              <input
                type="text"
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Enter benefit"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <button
                type="button"
                onClick={() => handleArrayAdd('benefits', newBenefit, setNewBenefit)}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Add Benefit
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{benefit}</span>
                  <button
                    type="button"
                    onClick={() => handleArrayRemove('benefits', index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* How to Use */}
          <div>
            <label className="block text-gray-700 mb-2">How to Use</label>
            <div className="flex gap-4 mb-2">
              <input
                type="text"
                value={newHowToUse}
                onChange={(e) => setNewHowToUse(e.target.value)}
                placeholder="Enter usage instruction"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <button
                type="button"
                onClick={() => handleArrayAdd('how_to_use', newHowToUse, setNewHowToUse)}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Add Instruction
              </button>
            </div>
            <div className="space-y-2">
              {formData.how_to_use.map((instruction, index) => (
                <div
                  key={index}
                  className="bg-gray-100 px-4 py-2 rounded-lg flex items-center justify-between"
                >
                  <span>{instruction}</span>
                  <button
                    type="button"
                    onClick={() => handleArrayRemove('how_to_use', index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : (product ? 'Save Changes' : 'Add Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;