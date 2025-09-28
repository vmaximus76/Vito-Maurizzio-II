import React, { useState } from 'react';
import type { MenuItem, Ingredient, RecipeIngredient } from '../types';
import { TrashIcon, PlusIcon, MinusIcon, DuplicateIcon } from './icons';

interface MenuItemsManagerProps {
  menuItems: MenuItem[];
  ingredients: Ingredient[];
  onAddMenuItem: (name: string, sellingPrice: number, recipeIngredients: RecipeIngredient[]) => void;
  onDeleteMenuItem: (id: string) => void;
  onSelectMenuItem: (id: string) => void;
  selectedMenuItemId: string | null;
  calculateFoodCost: (recipe: RecipeIngredient[]) => number;
}

const MenuItemsManager: React.FC<MenuItemsManagerProps> = ({ menuItems, ingredients, onAddMenuItem, onDeleteMenuItem, onSelectMenuItem, selectedMenuItemId, calculateFoodCost }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [recipe, setRecipe] = useState<RecipeIngredient[]>([{ ingredientId: '', quantity: 0 }]);

  const handleRecipeChange = (index: number, field: keyof RecipeIngredient, value: string) => {
    const newRecipe = [...recipe];
    if (field === 'quantity') {
      newRecipe[index][field] = parseFloat(value) || 0;
    } else {
      newRecipe[index][field] = value;
    }
    setRecipe(newRecipe);
  };
  
  const handleQuantityChange = (index: number, delta: number) => {
      const newRecipe = [...recipe];
      const currentQuantity = newRecipe[index].quantity || 0;
      const newQuantity = Math.round((currentQuantity + delta) * 100) / 100; // Handle floating point issues
      newRecipe[index].quantity = Math.max(0, newQuantity); // Prevent negative quantity
      setRecipe(newRecipe);
  };
  
  const handleDuplicateRow = (index: number) => {
      const newRecipe = [...recipe];
      const rowToDuplicate = { ...newRecipe[index] };
      newRecipe.splice(index + 1, 0, rowToDuplicate);
      setRecipe(newRecipe);
  };

  const addRecipeRow = () => {
    setRecipe([...recipe, { ingredientId: '', quantity: 0 }]);
  };
  
  const removeRecipeRow = (index: number) => {
    setRecipe(recipe.filter((_, i) => i !== index));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sellingPrice = parseFloat(price);
    if (name && !isNaN(sellingPrice) && sellingPrice > 0) {
      onAddMenuItem(name, sellingPrice, recipe);
      setName('');
      setPrice('');
      setRecipe([{ ingredientId: '', quantity: 0 }]);
      setShowForm(false);
    }
  };

  return (
    <section className="bg-[#041d4f] rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center border-b-2 border-[#7baed5]/20 pb-2 mb-4">
        <h2 className="text-2xl font-bold text-[#7baed5]">Menu Items</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#7baed5] text-[#000000] font-bold text-sm py-1 px-3 rounded-md hover:bg-[#7baed5]/90 transition-colors duration-300">
          {showForm ? 'Cancel' : 'Add New'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 mb-4 bg-[#000000]/30 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Menu Item Name" required className="bg-[#000000]/50 p-2 rounded-md focus:ring-[#7baed5] focus:ring-2 focus:outline-none" />
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Selling Price" min="0" step="0.01" required className="bg-[#000000]/50 p-2 rounded-md focus:ring-[#7baed5] focus:ring-2 focus:outline-none" />
          </div>
          <h3 className="font-semibold text-white/90 pt-2 border-t border-[#7baed5]/20">Recipe</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {recipe.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-center">
                <select value={item.ingredientId} onChange={e => handleRecipeChange(index, 'ingredientId', e.target.value)} required className="col-span-5 bg-[#000000]/50 p-2 rounded-md focus:ring-[#7baed5] focus:ring-1 focus:outline-none">
                  <option value="">Select Ingredient</option>
                  {ingredients.map(ing => <option key={ing.id} value={ing.id}>{ing.name}</option>)}
                </select>

                <div className="col-span-4 flex items-center bg-[#000000]/50 rounded-md focus-within:ring-[#7baed5] focus-within:ring-1">
                    <button type="button" onClick={() => handleQuantityChange(index, -1)} className="p-2 text-[#7baed5]/70 hover:text-white" aria-label="Decrease quantity">
                        <MinusIcon className="w-4 h-4" />
                    </button>
                    <input 
                        type="number" 
                        value={item.quantity || ''} 
                        onChange={e => handleRecipeChange(index, 'quantity', e.target.value)} 
                        placeholder="Qty" 
                        min="0" step="any" required 
                        className="w-full bg-transparent p-1 text-center focus:outline-none appearance-none [-moz-appearance:textfield]" 
                    />
                    <button type="button" onClick={() => handleQuantityChange(index, 1)} className="p-2 text-[#7baed5]/70 hover:text-white" aria-label="Increase quantity">
                        <PlusIcon className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="col-span-3 flex items-center justify-end space-x-1">
                    <button type="button" onClick={() => handleDuplicateRow(index)} className="text-[#7baed5]/70 hover:text-[#FFFFFF] p-1" title="Duplicate ingredient">
                        <DuplicateIcon className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => removeRecipeRow(index)} className="text-[#7baed5]/70 hover:text-[#FFFFFF] p-1" title="Remove ingredient">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={addRecipeRow} className="text-sm flex items-center gap-1 text-[#7baed5] hover:text-[#FFFFFF]"><PlusIcon className="w-4 h-4"/>Add Ingredient to Recipe</button>
          <button type="submit" className="w-full bg-[#7baed5] text-[#000000] font-bold py-2 px-4 rounded-md hover:bg-[#7baed5]/90 transition-colors duration-300">Save Menu Item</button>
        </form>
      )}

      <div className="max-h-96 overflow-y-auto pr-2 space-y-2">
        {menuItems.map(item => (
          <div key={item.id} onClick={() => onSelectMenuItem(item.id)} className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-colors duration-200 ${selectedMenuItemId === item.id ? 'bg-[#7baed5]/20' : 'bg-[#000000]/30 hover:bg-[#000000]/50'}`}>
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-[#7baed5]">Food Cost: ${calculateFoodCost(item.ingredients).toFixed(2)}</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onDeleteMenuItem(item.id); }} className="text-[#7baed5]/70 hover:text-[#FFFFFF] p-1"><TrashIcon className="w-4 h-4"/></button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuItemsManager;