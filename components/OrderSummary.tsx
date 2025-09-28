import React from 'react';
import type { MenuItem, Ingredient, RecipeIngredient } from '../types';

interface CostBreakdownProps {
  menuItem: MenuItem | null;
  ingredientsMap: Map<string, Ingredient>;
  calculateFoodCost: (recipe: RecipeIngredient[]) => number;
  onUpdatePrice: (id: string, newPrice: number) => void;
}

const CostBreakdown: React.FC<CostBreakdownProps> = ({ menuItem, ingredientsMap, calculateFoodCost, onUpdatePrice }) => {

  if (!menuItem) {
    return (
      <aside className="bg-[#041d4f] rounded-lg shadow-2xl p-6 h-full flex items-center justify-center">
        <p className="text-[#7baed5]/80 text-center">Select a menu item to see its cost breakdown.</p>
      </aside>
    );
  }

  const foodCost = calculateFoodCost(menuItem.ingredients);
  const sellingPrice = menuItem.sellingPrice;
  const foodCostPercentage = sellingPrice > 0 ? (foodCost / sellingPrice) * 100 : 0;
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPrice = parseFloat(e.target.value);
      if(!isNaN(newPrice)) {
          onUpdatePrice(menuItem.id, newPrice);
      }
  }

  return (
    <aside className="bg-[#041d4f] rounded-lg shadow-2xl p-6">
      <h2 className="text-2xl font-bold text-[#7baed5] border-b-2 border-[#7baed5]/20 pb-3 mb-4">
        Cost Breakdown
      </h2>
      <h3 className="text-xl font-semibold text-white mb-4">{menuItem.name}</h3>
      
      <div className="max-h-60 overflow-y-auto pr-2 space-y-2 mb-4">
        {menuItem.ingredients.map((recipeIng, index) => {
          const ingredient = ingredientsMap.get(recipeIng.ingredientId);
          if (!ingredient) return <div key={index} className="text-white">Ingredient not found</div>;
          const ingredientCost = recipeIng.quantity * ingredient.costPerUnit;
          return (
            <div key={ingredient.id} className="flex justify-between items-center text-sm">
              <span className="text-white/90">{ingredient.name} ({recipeIng.quantity} {ingredient.unit})</span>
              <span className="font-mono text-[#7baed5]/80">${ingredientCost.toFixed(2)}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t-2 border-[#7baed5]/20 space-y-3">
        <div className="flex justify-between items-center">
            <label htmlFor="selling-price" className="font-semibold text-white/90">Selling Price</label>
            <input 
                id="selling-price"
                type="number"
                value={sellingPrice}
                onChange={handlePriceChange}
                step="0.01"
                min="0"
                className="bg-[#000000]/50 p-2 rounded-md w-28 text-right font-semibold focus:ring-[#7baed5] focus:ring-2 focus:outline-none"
            />
        </div>
        <div className="flex justify-between text-lg">
          <span className="font-semibold text-white/90">Total Food Cost</span>
          <span className="font-bold text-[#7baed5]">${foodCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span className="font-semibold text-white/90">Food Cost %</span>
          <span className="font-bold text-white">
            {foodCostPercentage.toFixed(1)}%
          </span>
        </div>
      </div>
    </aside>
  );
};

export default CostBreakdown;