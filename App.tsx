import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import type { Language, Recipe } from './types';
import { getUiText } from './constants';
import { generateRecipe } from './services/geminiService';

import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import RecipeDisplay from './components/RecipeDisplay';
import LoadingAnimation from './components/LoadingAnimation';

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [timeConstraint, setTimeConstraint] = useState<string>('40');

  const uiText = getUiText(language);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        loadingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [isLoading]);

  const handleGenerateRecipe = async (ingredients: string[], time: string) => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const newRecipe = await generateRecipe(ingredients, time, language);
      setRecipe(newRecipe);
    } catch (err) {
      setError(uiText.errorGenerating);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownloadPdf = () => {
    const input = document.getElementById('recipe-content');
    if (!input) {
        alert(uiText.pdfError);
        return;
    }
    html2canvas(input, { 
        scale: 2, 
        backgroundColor: document.body.classList.contains('dark') ? '#1F2937' : '#FFFFFF', // Use correct background
        useCORS: true,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 40; // with margin
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 20, 20, pdfWidth, pdfHeight);
        pdf.save(`${recipe?.title?.replace(/\s+/g, '_') || 'recipe'}.pdf`);
      })
      .catch(err => {
        console.error("Error generating PDF", err);
        alert(uiText.pdfError);
      });
  };

  const handleShare = async () => {
    if (!recipe) return;

    const shareText = `${recipe.title}\n\n${recipe.description}\n\n${uiText.ingredients}:\n- ${recipe.ingredients.join('\n- ')}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: shareText,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error("Error sharing:", err);
          alert(uiText.shareError);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert(uiText.recipeCopied);
      } catch (err) {
        console.error("Clipboard write failed:", err);
        alert(uiText.shareError);
      }
    }
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <Header language={language} setLanguage={setLanguage} />
        
        <main className="w-full flex flex-col items-center mt-8">
          <IngredientInput
            language={language}
            onGenerate={handleGenerateRecipe}
            isLoading={isLoading}
            timeConstraint={timeConstraint}
            setTimeConstraint={setTimeConstraint}
          />

          {error && (
            <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-200 rounded-lg" role="alert">
              {error}
            </div>
          )}

          {isLoading && (
             <div className="mt-8" ref={loadingRef}>
               <LoadingAnimation language={language} />
             </div>
          )}

          {recipe && !isLoading && (
            <RecipeDisplay recipe={recipe} language={language} onDownloadPdf={handleDownloadPdf} onShare={handleShare} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;