'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';

const workoutOptions = [
  { 
    id: '0-2', 
    label: '0-2', 
    description: 'Treinos de vez em quando',
    icon: 'dot'
  },
  { 
    id: '3-5', 
    label: '3-5', 
    description: 'Alguns treinos por semana',
    icon: 'triangle'
  },
  { 
    id: '6+', 
    label: '6+', 
    description: 'Atleta dedicado',
    icon: 'vertical'
  },
];

export default function WorkoutsStep() {
  const router = useRouter();
  const { updateAnswer, nextStep, currentStep, answers } = useQuizStore();

  const handleSelect = (workoutId: string) => {
    updateAnswer('workoutsPerWeek', workoutId);
  };

  const handleContinue = () => {
    if (answers.workoutsPerWeek) {
      nextStep();
      router.push(`/quiz/${currentStep + 1}`);
    }
  };

  const renderIcon = (iconType: string, isSelected: boolean) => {
    const bgClass = isSelected ? 'bg-white' : 'bg-white border border-gray-200';
    const strokeColor = 'black';
    
    switch (iconType) {
      case 'dot':
        // Pessoa descansando/caminhando
        return (
          <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${bgClass}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="5" r="2" fill={strokeColor}/>
              <path d="M12 9v5M9 21l3-7 3 7"/>
              <path d="M8 14h8"/>
            </svg>
          </div>
        );
      case 'triangle':
        // Pessoa correndo
        return (
          <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${bgClass}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="14" cy="4" r="2" fill={strokeColor}/>
              <path d="M4 17l5-5 2 1 4-4"/>
              <path d="M15 8l3 3-3 5"/>
              <path d="M9 12l-3 7h4"/>
            </svg>
          </div>
        );
      case 'vertical':
        // Atleta/haltere
        return (
          <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${bgClass}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="4" r="2" fill={strokeColor}/>
              <path d="M12 8v3"/>
              <path d="M5 11h14"/>
              <rect x="3" y="9" width="4" height="5" rx="1" fill={strokeColor}/>
              <rect x="17" y="9" width="4" height="5" rx="1" fill={strokeColor}/>
              <path d="M9 21l3-7 3 7"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4">
        <h1 className="text-[32px] md:text-[40px] font-bold text-black mb-3 leading-tight max-w-md mx-auto">
          Quantos treinos você faz por semana?
        </h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="space-y-3 max-w-md mx-auto w-full">
          {workoutOptions.map((option) => {
            const isSelected = answers.workoutsPerWeek === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`w-full py-4 md:py-5 px-4 md:px-6 rounded-[16px] md:rounded-[20px] transition-all duration-200 text-left flex items-center gap-3 md:gap-4 ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
                }`}
              >
                {renderIcon(option.icon, isSelected)}
                <div className="flex-1 min-w-0">
                  <div className={`text-[16px] md:text-[17px] font-semibold ${
                    isSelected ? 'text-white' : 'text-black'
                  }`}>
                    {option.label}
                  </div>
                  <div className={`text-[14px] md:text-[15px] ${
                    isSelected ? 'text-white/80' : 'text-gray-600'
                  }`}>
                    {option.description}
                  </div>
                </div>
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
            disabled={!answers.workoutsPerWeek}
            className={`w-full py-4 md:py-5 px-6 rounded-[16px] md:rounded-[20px] font-semibold text-[16px] md:text-[17px] transition-all duration-200 ${
              answers.workoutsPerWeek
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

