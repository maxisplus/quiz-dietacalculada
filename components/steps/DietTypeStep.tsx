'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';

const diets = [
  { id: 'classico', label: 'Clássico', description: 'Como de tudo', emoji: '🍖', bgColor: 'bg-amber-100', bgColorSelected: 'bg-amber-500' },
  { id: 'vegetariano', label: 'Vegetariano', description: 'Sem carne', emoji: '🥗', bgColor: 'bg-green-100', bgColorSelected: 'bg-green-500' },
  { id: 'vegano', label: 'Vegano', description: 'Sem produtos animais', emoji: '🌱', bgColor: 'bg-emerald-100', bgColorSelected: 'bg-emerald-500' },
];

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
          Qual tipo de dieta você segue?
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
                    ? 'bg-[#1a1a1a] text-white shadow-lg'
                    : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
                }`}
              >
                {/* Emoji Icon */}
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all ${
                  isSelected ? diet.bgColorSelected : diet.bgColor
                }`}>
                  <span className="text-[28px] md:text-[32px]">{diet.emoji}</span>
                </div>
                
                <div className="flex-1">
                  <span className={`text-[17px] md:text-[18px] font-semibold block ${
                    isSelected ? 'text-white' : 'text-black'
                  }`}>
                    {diet.label}
                  </span>
                  <span className={`text-[14px] md:text-[15px] ${
                    isSelected ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {diet.description}
                  </span>
                </div>

                {/* Indicador de seleção */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected 
                    ? 'border-white bg-white' 
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <svg className="w-4 h-4 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
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
