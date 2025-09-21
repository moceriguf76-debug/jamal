export type Language = 'en' | 'ru';

export interface Instruction {
  step: string;
  iconName: string; // e.g., 'chop', 'mix', 'heat'
}

export interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  calories: string;
  ingredients: string[];
  instructions: Instruction[];
  imageUrl?: string;
}