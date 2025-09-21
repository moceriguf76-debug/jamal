import React from 'react';
import type { Language, Recipe } from '../types';
import { getUiText } from '../constants';
import InstructionIcon from './InstructionIcons';
import ImagePlaceholder from './ImagePlaceholder';

// SVG Icons for stats
const PrepTimeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const CookTimeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0121 10c0 3-1.5 6-6.014 6.014-2 1-4.444 2.986-7.014 2.986z" />
  </svg>
);
const CaloriesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);
const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.862 13.036 9 12.733 9 12.413c0-1.323-.934-2.48-2.18-2.825a5.13 5.13 0 00-2.64 0c-1.246.345-2.18 1.502-2.18 2.825 0 .32.138.623.316.929M15 13.342c.178.306.316.61.316.929 0 1.323-.934 2.48-2.18 2.825a5.13 5.13 0 01-2.64 0c-1.246-.345-2.18-1.502-2.18-2.825 0-.32.138-.623.316-.929m0 0l6.52-3.51m-6.52 3.51V6.342" />
    </svg>
);


interface RecipeDisplayProps {
  recipe: Recipe | null;
  language: Language;
  onDownloadPdf: () => void;
  onShare: () => void;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, language, onDownloadPdf, onShare }) => {
  if (!recipe) {
    return null;
  }

  const uiText = getUiText(language);

  return (
    <div className="w-full max-w-4xl p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-xl mt-8 animate-fade-in" id="recipe-content">
      <h2 className="text-4xl font-bold font-serif text-center mb-2 text-gray-800 dark:text-white">{recipe.title}</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">{recipe.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          {recipe.imageUrl ? (
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-auto object-cover rounded-xl shadow-lg" />
          ) : (
            <ImagePlaceholder />
          )}

          <div className="flex justify-around text-center mt-6 p-4 bg-cream/60 dark:bg-gray-700/50 rounded-xl">
            <div className="flex flex-col items-center text-terracotta-600 dark:text-terracotta-500">
              <PrepTimeIcon/>
              <p className="font-bold">{uiText.prepTime}</p>
              <p className="text-gray-800 dark:text-gray-200">{recipe.prepTime}</p>
            </div>
            <div className="flex flex-col items-center text-terracotta-600 dark:text-terracotta-500">
              <CookTimeIcon />
              <p className="font-bold">{uiText.cookTime}</p>
              <p className="text-gray-800 dark:text-gray-200">{recipe.cookTime}</p>
            </div>
            <div className="flex flex-col items-center text-terracotta-600 dark:text-terracotta-500">
              <CaloriesIcon />
              <p className="font-bold">{uiText.calories}</p>
              <p className="text-gray-800 dark:text-gray-200">{recipe.calories}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-2xl font-serif font-semibold mb-3 text-gray-800 dark:text-white border-b-2 border-terracotta-500/30 dark:border-terracotta-500/50 pb-2">{uiText.ingredients}</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 marker:text-terracotta-500">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-2xl font-serif font-semibold mb-4 text-gray-800 dark:text-white border-b-2 border-terracotta-500/30 dark:border-terracotta-500/50 pb-2">{uiText.instructions}</h3>
        <ul className="space-y-4">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="flex items-start p-3 rounded-lg hover:bg-cream/50 dark:hover:bg-gray-700/40 transition-colors">
              <InstructionIcon name={instruction.iconName} />
              <p className="text-gray-800 dark:text-gray-200 flex-1">{instruction.step}</p>
            </li>
          ))}
        </ul>
      </div>

       <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onDownloadPdf}
          className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <DownloadIcon />
          {uiText.downloadPdf}
        </button>
        <button
          onClick={onShare}
          className="flex items-center px-4 py-2 bg-terracotta-600 text-white font-bold rounded-lg hover:bg-terracotta-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <ShareIcon />
          {uiText.share}
        </button>
      </div>
    </div>
  );
};

export default RecipeDisplay;