export interface Ingredient {
  id: string;
  name: string;
  unit: string; // e.g., 'g', 'oz', 'each', 'ml'
  costPerUnit: number;
}

export interface RecipeIngredient {
  ingredientId: string;
  quantity: number;
}

export interface MenuItem {
  id: string;
  name: string;
  ingredients: RecipeIngredient[];
  sellingPrice: number;
}
