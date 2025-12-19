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
    const bgClass = isSelected ? 'bg-white shadow-sm' : 'bg-white border-2 border-gray-200';
    const iconColor = isSelected ? '#1a1a1a' : '#6b7280';
    
    switch (iconType) {
      case 'dot':
        // Ícone de caminhada/leve
        return (
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center ${bgClass} transition-all`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="4.5" r="2" fill={iconColor}/>
              <path d="M12 8c-1 0-2 1-2 2v3l-2 6h1.5l1.5-4 1.5 4H14l-2-6V10c0-1-1-2-2-2z" fill={iconColor}/>
              <path d="M10 19h4" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        );
      case 'triangle':
        // Ícone de corrida/moderado
        return (
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center ${bgClass} transition-all`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="14" cy="3.5" r="2" fill={iconColor}/>
              <path d="M13 7l-5 5 2 2 3-3 2 3 2-2-3-4-1-1z" fill={iconColor}/>
              <path d="M7 17l2-4 2 1" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 12l1 6 2-1" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      case 'vertical':
        // Ícone de musculação/intenso
        return (
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center ${bgClass} transition-all`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="4" r="2" fill={iconColor}/>
              <rect x="2" y="9" width="4" height="6" rx="1" fill={iconColor}/>
              <rect x="18" y="9" width="4" height="6" rx="1" fill={iconColor}/>
              <rect x="6" y="10.5" width="2" height="3" rx="0.5" fill={iconColor}/>
              <rect x="16" y="10.5" width="2" height="3" rx="0.5" fill={iconColor}/>
              <line x1="8" y1="12" x2="16" y2="12" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M10 17l2-3 2 3" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 20h4" stroke={iconColor} strokeWidth="2" strokeLinecap="round"/>
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

