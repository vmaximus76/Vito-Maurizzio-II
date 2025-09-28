import React, { useState, useCallback, useMemo } from 'react';
import IngredientsManager from './components/Menu';
import MenuItemsManager from './components/MenuItemCard';
import CostBreakdown from './components/OrderSummary';
import { INITIAL_INGREDIENTS, INITIAL_MENU_ITEMS } from './constants';
import type { Ingredient, MenuItem, RecipeIngredient } from './types';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(INITIAL_INGREDIENTS);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState<string | null>(INITIAL_MENU_ITEMS[0]?.id || null);

  const handleAddIngredient = useCallback((name: string, unit: string, costPerUnit: number) => {
    const newIngredient: Ingredient = {
      id: crypto.randomUUID(),
      name,
      unit,
      costPerUnit,
    };
    setIngredients(prev => [...prev, newIngredient]);
  }, []);

  const handleDeleteIngredient = useCallback((id: string) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
    // Also remove this ingredient from any recipes
    setMenuItems(prev => prev.map(item => ({
      ...item,
      ingredients: item.ingredients.filter(ing => ing.ingredientId !== id)
    })));
  }, []);

  const handleAddMenuItem = useCallback((name: string, sellingPrice: number, recipeIngredients: RecipeIngredient[]) => {
    const newMenuItem: MenuItem = {
      id: crypto.randomUUID(),
      name,
      sellingPrice,
      ingredients: recipeIngredients.filter(ing => ing.ingredientId && ing.quantity > 0),
    };
    setMenuItems(prev => [...prev, newMenuItem]);
  }, []);

  const handleDeleteMenuItem = useCallback((id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    if (selectedMenuItemId === id) {
      setSelectedMenuItemId(null);
    }
  }, [selectedMenuItemId]);

  const handleUpdateMenuItemPrice = useCallback((id: string, newPrice: number) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, sellingPrice: newPrice } : item));
  }, []);

  const selectedMenuItem = useMemo(() => {
    return menuItems.find(item => item.id === selectedMenuItemId) || null;
  }, [menuItems, selectedMenuItemId]);

  const ingredientsMap = useMemo(() => {
    return new Map(ingredients.map(ing => [ing.id, ing]));
  }, [ingredients]);

  const calculateFoodCost = useCallback((recipe: RecipeIngredient[]): number => {
    return recipe.reduce((total, recipeIng) => {
      const ingredient = ingredientsMap.get(recipeIng.ingredientId);
      if (ingredient) {
        return total + (ingredient.costPerUnit * recipeIng.quantity);
      }
      return total;
    }, 0);
  }, [ingredientsMap]);

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] font-sans">
      <header className="bg-[#041d4f]/80 backdrop-blur-sm shadow-lg p-4 sticky top-0 z-20">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-[#7baed5]">Two Rivers Alehouse</h1>
          <p className="text-[#7baed5]/80">Food Cost Calculator</p>
        </div>
      </header>
      
      <main className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <IngredientsManager 
              ingredients={ingredients}
              onAddIngredient={handleAddIngredient}
              onDeleteIngredient={handleDeleteIngredient}
            />
            <MenuItemsManager 
              menuItems={menuItems}
              ingredients={ingredients}
              onAddMenuItem={handleAddMenuItem}
              onDeleteMenuItem={handleDeleteMenuItem}
              onSelectMenuItem={setSelectedMenuItemId}
              selectedMenuItemId={selectedMenuItemId}
              calculateFoodCost={calculateFoodCost}
            />
          </div>
          <div className="lg:sticky top-24 self-start">
            <CostBreakdown 
              menuItem={selectedMenuItem}
              ingredientsMap={ingredientsMap}
              calculateFoodCost={calculateFoodCost}
              onUpdatePrice={handleUpdateMenuItemPrice}
            />
          </div>
        </div>
      </main>

      <footer className="text-center p-4 text-[#7baed5]/70 text-sm">
        <p>Your internal cost management tool.</p>
      </footer>
    </div>
  );
};

export default App;