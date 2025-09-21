import React, { useState, useEffect } from 'react';
import { getUiText } from '../constants';
import type { Language } from '../types';
import Spinner from './Spinner';

interface IngredientInputProps {
  language: Language;
  onGenerate: (ingredients: string[], timeConstraint: string) => void;
  isLoading: boolean;
  timeConstraint: string;
  setTimeConstraint: (time: string) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ language, onGenerate, isLoading, timeConstraint, setTimeConstraint }) => {
  const uiText = getUiText(language);
  const [ingredientsText, setIngredientsText] = useState(uiText.initialIngredients);

  useEffect(() => {
    const enPlaceholder = getUiText('en').initialIngredients;
    const ruPlaceholder = getUiText('ru').initialIngredients;
    const currentPlaceholder = getUiText(language).initialIngredients;

    if ((ingredientsText === enPlaceholder || ingredientsText === ruPlaceholder) && ingredientsText !== currentPlaceholder) {
        setIngredientsText(currentPlaceholder);
    }
  }, [language, ingredientsText]);

  const handleSubmit = () => {
    const ingredientsList = ingredientsText
      .split(/[\n,]+/)
      .map(ing => ing.trim())
      .filter(Boolean);

    if (ingredientsList.length > 0) {
      onGenerate(ingredientsList, timeConstraint);
    }
  };

  return (
    <div className="w-full max-w-lg p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-xl space-y-4 transition-all duration-300">
      <div>
        <textarea
          value={ingredientsText}
          onChange={(e) => setIngredientsText(e.target.value)}
          placeholder={uiText.ingredientInputPlaceholder}
          className="w-full p-3 h-32 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none bg-cream/50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-colors"
          disabled={isLoading}
          aria-label="Ingredients list"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{uiText.ingredientHelperText}</p>
      </div>

       <div className="w-full pt-2">
        <label htmlFor="time-slider" className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span>{uiText.timeConstraint}</span>
            <span className="font-bold text-terracotta-600 dark:text-terracotta-500">{timeConstraint} min</span>
        </label>
        <input
          id="time-slider"
          type="range"
          min="15"
          max="120"
          value={timeConstraint}
          onChange={(e) => setTimeConstraint(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-terracotta-600"
          disabled={isLoading}
        />
    </div>
      <button
        onClick={handleSubmit}
        className="w-full flex justify-center items-center px-6 py-3 bg-terracotta-600 text-white font-bold rounded-lg hover:bg-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:ring-offset-2 disabled:bg-terracotta-500/50 dark:focus:ring-offset-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        disabled={isLoading || !ingredientsText.trim()}
      >
        {isLoading ? (
          <>
            <Spinner />
            <span className="ml-2">{uiText.generatingRecipeButton}</span>
          </>
        ) : (
          uiText.generateRecipeButton
        )}
      </button>
    </div>
  );
};

export default IngredientInput;