'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';

const genders = [
  { id: 'masculino', label: 'Masculino', emoji: '👨', bgColor: 'bg-blue-100', bgColorSelected: 'bg-blue-500' },
  { id: 'feminino', label: 'Feminino', emoji: '👩', bgColor: 'bg-pink-100', bgColorSelected: 'bg-pink-500' },
  { id: 'outro', label: 'Outro', emoji: '🌈', bgColor: 'bg-purple-100', bgColorSelected: 'bg-purple-500' },
];

export default function GenderStep() {
  const router = useRouter();
  const { updateAnswer, nextStep, currentStep, answers } = useQuizStore();

  const handleSelect = (genderId: string) => {
    updateAnswer('gender', genderId);
  };

  const handleContinue = () => {
    if (answers.gender) {
      nextStep();
      router.push(`/quiz/${currentStep + 1}`);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4">
        <h1 className="text-[32px] md:text-[40px] font-bold text-black mb-2 leading-tight max-w-md mx-auto">
          Escolha seu gênero
        </h1>
        <p className="text-[15px] md:text-[16px] text-gray-500 max-w-md mx-auto leading-relaxed">
          Isso será usado para calibrar seu plano personalizado.
        </p>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="space-y-3 max-w-md mx-auto w-full">
          {genders.map((gender) => {
            const isSelected = answers.gender === gender.id;
            return (
              <button
                key={gender.id}
                onClick={() => handleSelect(gender.id)}
                className={`w-full py-4 md:py-5 px-4 md:px-5 rounded-[16px] md:rounded-[20px] transition-all duration-200 text-left flex items-center gap-4 ${
                  isSelected
                    ? 'bg-[#1a1a1a] text-white shadow-lg'
                    : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
                }`}
              >
                {/* Emoji Icon */}
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all ${
                  isSelected ? gender.bgColorSelected : gender.bgColor
                }`}>
                  <span className="text-[28px] md:text-[32px]">{gender.emoji}</span>
                </div>
                
                <span className={`text-[18px] md:text-[19px] font-semibold flex-1 ${
                  isSelected ? 'text-white' : 'text-black'
                }`}>
                  {gender.label}
                </span>

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
            disabled={!answers.gender}
            className={`w-full py-4 md:py-5 px-6 rounded-[16px] md:rounded-[20px] font-semibold text-[16px] md:text-[17px] transition-all duration-200 ${
              answers.gender
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
