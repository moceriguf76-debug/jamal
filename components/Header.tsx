import React from 'react';
import type { Language } from '../types';
import { getUiText } from '../constants';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const uiText = getUiText(language);
  
  return (
    <header className="w-full max-w-5xl flex justify-between items-center p-4">
      <h1 className="text-3xl font-bold font-serif text-gray-800 dark:text-cream">{uiText.title}</h1>
      <LanguageSwitcher language={language} setLanguage={setLanguage} />
    </header>
  );
};

export default Header;