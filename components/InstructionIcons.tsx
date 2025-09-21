import React from 'react';

const iconStyles = "w-7 h-7 mr-4 text-terracotta-500 flex-shrink-0";

// A default icon in case the model returns an unexpected iconName
const DefaultIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
    </svg>
);

const ChopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V9.75a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 9.75v8.5A2.25 2.25 0 0 0 6 20.25Z" />
    </svg>
);

const MixIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-4.991-2.691v4.992" />
    </svg>
);

const HeatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.287 8.287 0 0 0 3-2.553Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v.01M12 12.75v.01" />
    </svg>
);

const BakeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18V7.5m18 0-9-4.5L3 7.5m18 0-9 4.5m9-4.5v9" />
    </svg>
);

const ServeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 12 10.5-6.5m0 0L21 12m-2.25 2.25-1.125-1.125a8.25 8.25 0 0 0-11.667 0L6 14.25" />
    </svg>
);


const icons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  chop: ChopIcon,
  slice: ChopIcon,
  dice: ChopIcon,
  mix: MixIcon,
  whisk: MixIcon,
  season: MixIcon,
  pour: MixIcon,
  heat: HeatIcon,
  boil: HeatIcon,
  fry: HeatIcon,
  preheat: HeatIcon,
  bake: BakeIcon,
  serve: ServeIcon,
  garnish: ServeIcon,
  rest: ServeIcon,
  default: DefaultIcon,
};

interface InstructionIconProps {
  name: string;
}

const InstructionIcon: React.FC<InstructionIconProps> = ({ name }) => {
  const IconComponent = icons[name.toLowerCase()] || DefaultIcon;
  return <IconComponent className={iconStyles} aria-hidden="true" />;
};

export default InstructionIcon;