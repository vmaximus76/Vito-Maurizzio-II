import type { Ingredient, MenuItem } from './types';

export const INITIAL_INGREDIENTS: Ingredient[] = [
  { id: 'ing-1', name: 'Pretzel Stick', unit: 'each', costPerUnit: 0.50 },
  { id: 'ing-2', name: 'Crab Dip', unit: 'g', costPerUnit: 0.02 },
  { id: 'ing-3', name: 'Cheddar Cheese', unit: 'g', costPerUnit: 0.01 },
  { id: 'ing-4', name: 'Tortilla Chips', unit: 'g', costPerUnit: 0.008 },
  { id: 'ing-5', name: 'Ground Beef', unit: 'g', costPerUnit: 0.015 },
  { id: 'ing-6', name: 'Chili Seasoning', unit: 'g', costPerUnit: 0.03 },
  { id: 'ing-7', name: 'Flatbread Base', unit: 'each', costPerUnit: 0.75 },
  { id: 'ing-8', name: 'Tomato Sauce', unit: 'ml', costPerUnit: 0.005 },
  { id: 'ing-9', name: 'Mozzarella', unit: 'g', costPerUnit: 0.012 },
  { id: 'ing-10', name: 'Burger Bun', unit: 'each', costPerUnit: 0.60 },
  { id: 'ing-11', name: 'Beef Patty (1/3 lb)', unit: 'each', costPerUnit: 1.50 },
  { id: 'ing-12', name: 'Lettuce Leaf', unit: 'each', costPerUnit: 0.10 },
  { id: 'ing-13', name: 'Tomato Slice', unit: 'each', costPerUnit: 0.15 },
  { id: 'ing-14', name: 'Onion Slice', unit: 'each', costPerUnit: 0.05 },
  { id: 'ing-15', name: 'American Cheese Slice', unit: 'each', costPerUnit: 0.25 },
  { id: 'ing-16', name: 'Chicken Wings', unit: 'each', costPerUnit: 0.40 },
  { id: 'ing-17', name: 'Buffalo Sauce', unit: 'ml', costPerUnit: 0.01 },
  { id: 'ing-18', name: 'Blue Cheese Dressing', unit: 'ml', costPerUnit: 0.015 },
  { id: 'ing-19', name: 'Romaine Lettuce', unit: 'g', costPerUnit: 0.009 },
  { id: 'ing-20', name: 'Caesar Dressing', unit: 'ml', costPerUnit: 0.012 },
  { id: 'ing-21', name: 'Croutons', unit: 'g', costPerUnit: 0.02 },
  { id: 'ing-22', name: 'Parmesan Cheese', unit: 'g', costPerUnit: 0.025 },
  { id: 'ing-23', name: 'Chicken Breast', unit: 'g', costPerUnit: 0.018 },
  { id: 'ing-24', name: 'Basil', unit: 'g', costPerUnit: 0.10 },
  { id: 'ing-25', name: 'French Fries', unit: 'g', costPerUnit: 0.007 },
  { id: 'ing-26', name: 'Bacon', unit: 'slice', costPerUnit: 0.30 },
  { id: 'ing-27', name: 'Cheese Sauce', unit: 'g', costPerUnit: 0.015 },
  { id: 'ing-28', name: 'Sliced Steak', unit: 'g', costPerUnit: 0.025 },
  { id: 'ing-29', name: 'Green Peppers', unit: 'g', costPerUnit: 0.008 },
  { id: 'ing-30', name: 'Hoagie Roll', unit: 'each', costPerUnit: 0.80 },
  { id: 'ing-31', name: 'Cod Fillet', unit: 'each', costPerUnit: 2.50 },
  { id: 'ing-32', name: 'Beer Batter Mix', unit: 'g', costPerUnit: 0.01 },
  { id: 'ing-33', name: 'Tartar Sauce', unit: 'ml', costPerUnit: 0.015 },
  { id: 'ing-34', name: 'Lemon Wedge', unit: 'each', costPerUnit: 0.12 },
  { id: 'ing-35', name: 'Brownie', unit: 'each', costPerUnit: 1.20 },
  { id: 'ing-36', name: 'Vanilla Ice Cream', unit: 'scoop', costPerUnit: 0.75 },
  { id: 'ing-37', name: 'Chocolate Syrup', unit: 'ml', costPerUnit: 0.02 },
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'menu-1',
    name: 'Crabby Pretzel Stix',
    sellingPrice: 8.95,
    ingredients: [
      { ingredientId: 'ing-1', quantity: 2 },
      { ingredientId: 'ing-2', quantity: 50 },
      { ingredientId: 'ing-3', quantity: 30 },
    ],
  },
  {
    id: 'menu-2',
    name: 'Ale Yes, Nachos!',
    sellingPrice: 8.95,
    ingredients: [
      { ingredientId: 'ing-4', quantity: 150 },
      { ingredientId: 'ing-5', quantity: 100 },
      { ingredientId: 'ing-2', quantity: 60 },
      { ingredientId: 'ing-6', quantity: 10 },
    ]
  },
  {
    id: 'menu-3',
    name: 'Margherita Flatbread',
    sellingPrice: 10.95,
    ingredients: [
      { ingredientId: 'ing-7', quantity: 1 },
      { ingredientId: 'ing-8', quantity: 60 },
      { ingredientId: 'ing-9', quantity: 80 },
      { ingredientId: 'ing-24', quantity: 5 },
    ]
  },
  {
    id: 'menu-4',
    name: 'Alehouse Wings',
    sellingPrice: 12.95,
    ingredients: [
      { ingredientId: 'ing-16', quantity: 8 },
      { ingredientId: 'ing-17', quantity: 60 },
      { ingredientId: 'ing-18', quantity: 30 },
    ]
  },
  {
    id: 'menu-5',
    name: 'Classic Alehouse Burger',
    sellingPrice: 13.95,
    ingredients: [
      { ingredientId: 'ing-10', quantity: 1 },
      { ingredientId: 'ing-11', quantity: 1 },
      { ingredientId: 'ing-15', quantity: 1 },
      { ingredientId: 'ing-12', quantity: 2 },
      { ingredientId: 'ing-13', quantity: 2 },
      { ingredientId: 'ing-14', quantity: 2 },
    ]
  },
  {
    id: 'menu-6',
    name: 'Chicken Caesar Salad',
    sellingPrice: 11.95,
    ingredients: [
      { ingredientId: 'ing-19', quantity: 150 },
      { ingredientId: 'ing-23', quantity: 120 },
      { ingredientId: 'ing-20', quantity: 45 },
      { ingredientId: 'ing-21', quantity: 20 },
      { ingredientId: 'ing-22', quantity: 10 },
    ]
  },
  {
    id: 'menu-7',
    name: 'Loaded Alehouse Fries',
    sellingPrice: 9.95,
    ingredients: [
      { ingredientId: 'ing-25', quantity: 250 },
      { ingredientId: 'ing-27', quantity: 80 },
      { ingredientId: 'ing-26', quantity: 3 },
      { ingredientId: 'ing-3', quantity: 20 },
    ],
  },
  {
    id: 'menu-8',
    name: 'Philly Cheesesteak',
    sellingPrice: 14.95,
    ingredients: [
      { ingredientId: 'ing-30', quantity: 1 },
      { ingredientId: 'ing-28', quantity: 150 },
      { ingredientId: 'ing-14', quantity: 5 }, // Re-using Onion Slices, but let's assume it works as Sautéed Onions
      { ingredientId: 'ing-29', quantity: 40 },
      { ingredientId: 'ing-27', quantity: 60 },
    ],
  },
  {
    id: 'menu-9',
    name: 'Fish & Chips',
    sellingPrice: 15.95,
    ingredients: [
      { ingredientId: 'ing-31', quantity: 2 },
      { ingredientId: 'ing-32', quantity: 50 },
      { ingredientId: 'ing-25', quantity: 200 },
      { ingredientId: 'ing-33', quantity: 30 },
      { ingredientId: 'ing-34', quantity: 1 },
    ],
  },
  {
    id: 'menu-10',
    name: 'Brownie Sundae',
    sellingPrice: 7.95,
    ingredients: [
      { ingredientId: 'ing-35', quantity: 1 },
      { ingredientId: 'ing-36', quantity: 2 },
      { ingredientId: 'ing-37', quantity: 20 },
    ],
  },
];