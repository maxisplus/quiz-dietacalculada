'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';

const achievements = [
  { id: 'saudavel', label: 'Comer e viver de forma\nmais saudável' },
  { id: 'energia', label: 'Aumentar minha energia e\nmeu humor' },
  { id: 'motivacao', label: 'Manter-se motivado e consistente' },
  { id: 'corpo', label: 'Sentir-me melhor com meu corpo' },
];

const renderIcon = (id: string, isSelected: boolean) => {
  const bgClass = isSelected ? 'bg-white' : 'bg-white border border-gray-200';
  
  switch (id) {
    case 'saudavel':
      // Ícone de coração com batimento
      return (
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${bgClass}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21C12 21 4 14 4 8.5C4 5.5 6.5 3 9.5 3C11 3 12 4 12 4C12 4 13 3 14.5 3C17.5 3 20 5.5 20 8.5C20 14 12 21 12 21Z" fill="black"/>
            <path d="M4 12h4l2-3 2 6 2-3h6" stroke="white" strokeWidth="1.5"/>
          </svg>
        </div>
      );
    case 'energia':
      // Ícone de raio/energia
      return (
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${bgClass}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L4 14h8l-1 8 9-12h-8l1-8z"/>
          </svg>
        </div>
      );
    case 'motivacao':
      // Ícone de alvo/objetivo
      return (
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${bgClass}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"/>
            <circle cx="12" cy="12" r="5"/>
            <circle cx="12" cy="12" r="1" fill="black"/>
            <path d="M12 3v2"/>
            <path d="M12 19v2"/>
            <path d="M3 12h2"/>
            <path d="M19 12h2"/>
          </svg>
        </div>
      );
    case 'corpo':
      // Ícone de espelho/pessoa feliz
      return (
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${bgClass}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="5" fill="black"/>
            <path d="M12 13c-4 0-7 2-7 4v3h14v-3c0-2-3-4-7-4z" fill="black"/>
            <path d="M9 7c.5.5 1.5 1 3 1s2.5-.5 3-1" stroke="white" strokeWidth="1.5"/>
          </svg>
        </div>
      );
    default:
      return null;
  }
};

export default function AchievementsStep() {
  const router = useRouter();
  const { updateAnswer, nextStep, currentStep, answers } = useQuizStore();

  const handleToggle = (achievementId: string) => {
    const current = answers.achievements || [];
    const updated = current.includes(achievementId)
      ? current.filter((id) => id !== achievementId)
      : [...current, achievementId];
    updateAnswer('achievements', updated);
  };

  const handleContinue = () => {
    if (answers.achievements && answers.achievements.length > 0) {
      nextStep();
      router.push(`/quiz/${currentStep + 1}`);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4">
        <h1 className="text-[32px] md:text-[40px] font-bold text-black mb-3 leading-tight max-w-md mx-auto">
          O que você gostaria de alcançar?
        </h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="space-y-3 max-w-md mx-auto w-full">
            {achievements.map((achievement) => {
              const isSelected = answers.achievements?.includes(achievement.id) || false;
              return (
                <button
                  key={achievement.id}
                  onClick={() => handleToggle(achievement.id)}
                  className={`w-full py-4 md:py-5 px-4 md:px-5 rounded-[16px] md:rounded-[20px] transition-all duration-200 text-left flex items-center gap-4 ${
                    isSelected
                      ? 'bg-[#1a1a1a] text-white'
                      : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {renderIcon(achievement.id, isSelected)}
                  <span className="text-[16px] md:text-[17px] font-medium flex-1 whitespace-pre-line">
                    {achievement.label}
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
            disabled={!answers.achievements || answers.achievements.length === 0}
            className={`w-full py-4 md:py-5 px-6 rounded-[16px] md:rounded-[20px] font-semibold text-[16px] md:text-[17px] transition-all duration-200 ${
              answers.achievements && answers.achievements.length > 0
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
