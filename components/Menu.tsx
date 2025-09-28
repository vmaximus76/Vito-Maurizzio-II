import React, { useState } from 'react';
import type { Ingredient } from '../types';
import { TrashIcon } from './icons';

interface IngredientsManagerProps {
  ingredients: Ingredient[];
  onAddIngredient: (name: string, unit: string, costPerUnit: number) => void;
  onDeleteIngredient: (id: string) => void;
}

const IngredientsManager: React.FC<IngredientsManagerProps> = ({ ingredients, onAddIngredient, onDeleteIngredient }) => {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const costPerUnit = parseFloat(cost);
    if (name && unit && !isNaN(costPerUnit) && costPerUnit >= 0) {
      onAddIngredient(name, unit, costPerUnit);
      setName('');
      setUnit('');
      setCost('');
    }
  };

  return (
    <section className="bg-[#041d4f] rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-[#7baed5] border-b-2 border-[#7baed5]/20 pb-2 mb-4">
        Ingredients
      </h2>
      <div className="max-h-60 overflow-y-auto pr-2 mb-4 space-y-2">
        {ingredients.length > 0 ? ingredients.map(ing => (
          <div key={ing.id} className="flex justify-between items-center bg-[#000000]/30 p-2 rounded-md">
            <div>
              <p className="font-semibold">{ing.name}</p>
              <p className="text-sm text-[#7baed5]/80">${ing.costPerUnit.toFixed(4)} / {ing.unit}</p>
            </div>
            <button onClick={() => onDeleteIngredient(ing.id)} className="text-[#7baed5]/70 hover:text-[#FFFFFF] p-1"><TrashIcon className="w-4 h-4"/></button>
          </div>
        )) : <p className="text-[#7baed5]/80">No ingredients yet. Add one below.</p>}
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t-2 border-[#7baed5]/20 pt-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingredient Name"
          className="bg-[#000000]/50 p-2 rounded-md focus:ring-[#7baed5] focus:ring-2 focus:outline-none"
          required
        />
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="Unit (g, each, etc.)"
          className="bg-[#000000]/50 p-2 rounded-md focus:ring-[#7baed5] focus:ring-2 focus:outline-none"
          required
        />
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="Cost per Unit"
          step="0.0001"
          min="0"
          className="bg-[#000000]/50 p-2 rounded-md focus:ring-[#7baed5] focus:ring-2 focus:outline-none"
          required
        />
        <button type="submit" className="md:col-span-3 bg-[#7baed5] text-[#000000] font-bold py-2 px-4 rounded-md hover:bg-[#7baed5]/90 transition-colors duration-300">
          Add Ingredient
        </button>
      </form>
    </section>
  );
};

export default IngredientsManager;