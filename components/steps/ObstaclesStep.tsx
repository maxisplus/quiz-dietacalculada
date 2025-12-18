'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';

const obstacles = [
  { id: 'consistencia', label: 'Falta de consistência' },
  { id: 'habitos', label: 'Hábitos alimentares não saudáveis' },
  { id: 'apoio', label: 'Falta de apoio' },
  { id: 'agenda', label: 'Agenda lotada' },
  { id: 'inspiracao', label: 'Falta de inspiração para refeições' },
];

const renderIcon = (id: string, isSelected: boolean) => {
  const bgClass = isSelected ? 'bg-white' : 'bg-white border border-gray-200';
  
  switch (id) {
    case 'consistencia':
      // Ícone de gráfico com seta para baixo
      return (
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${bgClass}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18"/>
            <path d="M7 14l4-4 4 4 5-5"/>
            <path d="M17 9l3 0 0 3"/>
          </svg>
        </div>
      );
    case 'habitos':
      // Ícone de hambúrguer/fast food
      return (
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${bgClass}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 18h16c0 0 1 0 1 1s-1 1-1 1H4s-1 0-1-1 1-1 1-1z" fill="black"/>
            <path d="M4 10h16c1.1 0 2-.9 2-2s-.9-2-2-2H4c-1.1 0-2 .9-2 2s.9 2 2 2z" fill="black"/>
            <path d="M5 10v1c0 .5.2 1 .5 1.4l.5.6M19 10v1c0 .5-.2 1-.5 1.4l-.5.6"/>
            <path d="M6 14h12"/>
            <path d="M4 18c0-1.7 1.3-3 3-3h10c1.7 0 3 1.3 3 3"/>
          </svg>
        </div>
      );
    case 'apoio':
      // Ícone de duas pessoas/suporte
      return (
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${bgClass}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="7" r="3" fill="black"/>
            <circle cx="17" cy="7" r="2" fill="black"/>
            <path d="M5 21v-2a4 4 0 0 1 4-4h2"/>
            <path d="M15 21v-1a3 3 0 0 1 3-3h1"/>
            <path d="M12 14l-1-1"/>
          </svg>
        </div>
      );
    case 'agenda':
      // Ícone de relógio/tempo
      return (
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${bgClass}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
      );
    case 'inspiracao':
      // Ícone de lâmpada/ideia
      return (
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${bgClass}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6"/>
            <path d="M10 22h4"/>
            <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" fill="black"/>
          </svg>
        </div>
      );
    default:
      return null;
  }
};

export default function ObstaclesStep() {
  const router = useRouter();
  const { updateAnswer, nextStep, currentStep, answers } = useQuizStore();

  const handleToggle = (obstacleId: string) => {
    const current = answers.obstacles || [];
    const updated = current.includes(obstacleId)
      ? current.filter((id) => id !== obstacleId)
      : [...current, obstacleId];
    updateAnswer('obstacles', updated);
  };

  const handleContinue = () => {
    if (answers.obstacles && answers.obstacles.length > 0) {
      nextStep();
      router.push(`/quiz/${currentStep + 1}`);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4">
        <h1 className="text-[32px] md:text-[40px] font-bold text-black mb-3 leading-tight max-w-md mx-auto">
          O que está impedindo você de atingir seus objetivos?
        </h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="space-y-3 max-w-md mx-auto w-full">
            {obstacles.map((obstacle) => {
              const isSelected = answers.obstacles?.includes(obstacle.id) || false;
              return (
                <button
                  key={obstacle.id}
                  onClick={() => handleToggle(obstacle.id)}
                  className={`w-full py-4 md:py-5 px-4 md:px-5 rounded-[16px] md:rounded-[20px] transition-all duration-200 text-left flex items-center gap-4 ${
                    isSelected
                      ? 'bg-[#1a1a1a] text-white'
                      : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {renderIcon(obstacle.id, isSelected)}
                  <span className="text-[16px] md:text-[17px] font-medium flex-1">
                    {obstacle.label}
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
            disabled={!answers.obstacles || answers.obstacles.length === 0}
            className={`w-full py-4 md:py-5 px-6 rounded-[16px] md:rounded-[20px] font-semibold text-[16px] md:text-[17px] transition-all duration-200 ${
              answers.obstacles && answers.obstacles.length > 0
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
