
import React from 'react';
import type { Language } from '../types';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const buttonStyle = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeStyle = "bg-indigo-600 text-white shadow";
  const inactiveStyle = "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600";

  return (
    <div className="flex space-x-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <button
        onClick={() => setLanguage('en')}
        className={`${buttonStyle} ${language === 'en' ? activeStyle : inactiveStyle}`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ru')}
        className={`${buttonStyle} ${language === 'ru' ? activeStyle : inactiveStyle}`}
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;
