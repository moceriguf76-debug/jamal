import React, { useState, useEffect } from 'react';
import { getUiText } from '../constants';
import type { Language } from '../types';

// Self-contained SVG icon components for various food items
const ChickenIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.35 7.43a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78z" />
        <path d="M12.35 7.43 18 1.78l3.8 3.8-5.65 5.65" />
        <path d="m15.18 4.6-3.79 3.79" />
        <path d="M18.43 15.2a2.02 2.02 0 0 0-2.02-2.03c-1.12 0-2.03.9-2.03 2.03" />
    </svg>
);
const CornIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M8.5 22c0-2.5 1.5-6 1.5-6s1.5 3.5 1.5 6" />
        <path d="M12.5 22c0-2.5 1.5-6 1.5-6s1.5 3.5 1.5 6" />
        <path d="M11 2c-1.5 1.5-2 3.5-2 5.5s.5 4 2 5.5" />
        <path d="M13 2c1.5 1.5 2 3.5 2 5.5s-.5 4-2 5.5" />
        <path d="M11 7h2" /><path d="M11 11h2" /><path d="M11 15h2" />
    </svg>
);
const FriedEggIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20 16.5c0 4.2-3.8 6.5-8 6.5s-8-2.3-8-6.5S7.5 4 12 4s8 8.3 8 12.5z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);
const CakeSliceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20 21v-8a2 2 0 0 0-2-2H8" /><path d="M20 13H4a2 2 0 0 0-2 2v6" />
        <path d="M4 21h16" /><path d="m14 17-4-3" />
        <path d="M9 7.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z" />
    </svg>
);
const CasseroleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="10" width="20" height="8" rx="2" /><path d="M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
        <path d="M12 6V4" /><path d="M15 14h.01" /><path d="M9 14h.01" />
    </svg>
);
const FishIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M11.23 18.17a2.5 2.5 0 0 1-3.23.23 2.5 2.5 0 0 1-.23-3.23l8.5-8.5a2.5 2.5 0 0 1 3.46 3.46l-8.5 8.5Z" />
        <path d="M13.5 12.5s-2-2-4-4" /><path d="m16 15.5 4.5 4.5" />
    </svg>
);

const foodIcons: React.FC<React.SVGProps<SVGSVGElement>>[] = [
  ChickenIcon, CornIcon, FriedEggIcon, CakeSliceIcon, CasseroleIcon, FishIcon
];

interface LoadingAnimationProps {
    language: Language;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ language }) => {
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const uiText = getUiText(language);
    const loadingPhrases = uiText.loadingPhrases;

    useEffect(() => {
        const iconInterval = setInterval(() => {
            setCurrentIconIndex((prevIndex) => (prevIndex + 1) % foodIcons.length);
        }, 250);
        
        const phraseInterval = setInterval(() => {
            setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % loadingPhrases.length);
        }, 2000);

        return () => {
            clearInterval(iconInterval);
            clearInterval(phraseInterval);
        };
    }, [loadingPhrases.length]);

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
                {foodIcons.map((IconComponent, index) => (
                    <div
                        key={index}
                        className={`absolute transition-all duration-200 ease-in-out ${index === currentIconIndex ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}
                    >
                        <IconComponent className="w-20 h-20 text-terracotta-500" />
                    </div>
                ))}
            </div>
            <div className="relative h-6 mt-4 w-64 text-center">
                 {loadingPhrases.map((phrase, index) => (
                    <p
                        key={index}
                        className={`absolute w-full transition-all duration-300 ease-in-out text-lg text-gray-600 dark:text-gray-300 font-medium ${index === currentPhraseIndex ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                    >
                       {phrase}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default LoadingAnimation;