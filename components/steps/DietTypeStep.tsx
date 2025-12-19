'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';

const diets = [
  { id: 'classico', label: 'Clássico' },
  { id: 'vegetariano', label: 'Vegetariano' },
  { id: 'vegano', label: 'Vegano' },
];

const renderIcon = (id: string, isSelected: boolean) => {
  const bgClass = isSelected ? 'bg-white' : 'bg-white border border-gray-200';
  
  switch (id) {
    case 'classico':
      // Ícone de coxa de frango
      return (
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${bgClass}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 11c2-2 3-4 3-6 0-1-1-2-2-2s-2 1-2 2c0 1 .5 2 1 3" fill="black"/>
            <ellipse cx="10" cy="14" rx="5" ry="6" fill="black"/>
            <path d="M10 20v3"/>
            <path d="M8 20l-1 3"/>
            <path d="M12 20l1 3"/>
          </svg>
        </div>
      );
    case 'vegetariano':
      // Ícone de cenoura
      return (
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${bgClass}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 6c-1.5 0-3 .5-4 1.5L7 21l5-2 5 2-1-13.5C15 6.5 13.5 6 12 6z" fill="black"/>
            <path d="M10 6c0-2 .5-3 2-4"/>
            <path d="M14 6c0-2-.5-3-2-4"/>
            <path d="M8 4c-1 0-2 1-2 2"/>
            <path d="M16 4c1 0 2 1 2 2"/>
          </svg>
        </div>
      );
    case 'vegano':
      // Ícone de folha/planta
      return (
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${bgClass}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c-4-4-8-7-8-12C4 5 8 2 12 2s8 3 8 8c0 5-4 8-8 12z" fill="black"/>
            <path d="M12 22V10"/>
            <path d="M8 14c2-1 4-1 4 0"/>
            <path d="M16 14c-2-1-4-1-4 0"/>
          </svg>
        </div>
      );
    default:
      return null;
  }
};

export default function DietTypeStep() {
  const router = useRouter();
  const { updateAnswer, nextStep, currentStep, answers } = useQuizStore();

  const handleSelect = (dietId: string) => {
    updateAnswer('dietType', dietId);
  };

  const handleContinue = () => {
    if (answers.dietType) {
      nextStep();
      router.push(`/quiz/${currentStep + 1}`);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4">
        <h1 className="text-[32px] md:text-[40px] font-bold text-black mb-3 leading-tight max-w-md mx-auto">
          Você segue alguma dieta específica?
        </h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="space-y-3 max-w-md mx-auto w-full">
            {diets.map((diet) => {
              const isSelected = answers.dietType === diet.id;
              return (
                <button
                  key={diet.id}
                  onClick={() => handleSelect(diet.id)}
                  className={`w-full py-4 md:py-5 px-4 md:px-5 rounded-[16px] md:rounded-[20px] transition-all duration-200 text-left flex items-center gap-4 ${
                    isSelected
                      ? 'bg-[#1a1a1a] text-white'
                      : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {renderIcon(diet.id, isSelected)}
                  <span className="text-[16px] md:text-[17px] font-medium">
                    {diet.label}
                  </span>
                </button>
              );
            })}
        </div>
      </div>

      {/* Botão fixo no bottom */}
      <div className="px-6 pb-6 md:pb-8">
        <div className="max-w-md mx-auto w-full">
          <button
            onClick={handleContinue}
            disabled={!answers.dietType}
            className={`w-full py-4 md:py-5 px-6 rounded-[16px] md:rounded-[20px] font-semibold text-[16px] md:text-[17px] transition-all duration-200 ${
              answers.dietType
                ? 'bg-[#1a1a1a] text-white active:bg-black hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
