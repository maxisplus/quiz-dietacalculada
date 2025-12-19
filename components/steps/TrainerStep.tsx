'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';

export default function TrainerStep() {
  const router = useRouter();
  const { updateAnswer, nextStep, currentStep, answers } = useQuizStore();

  const handleSelect = (hasTrainer: boolean) => {
    updateAnswer('hasTrainer', hasTrainer);
  };

  const handleContinue = () => {
    if (answers.hasTrainer !== undefined) {
      nextStep();
      router.push(`/quiz/${currentStep + 1}`);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4">
        <h1 className="text-[32px] md:text-[40px] font-bold text-black mb-3 leading-tight max-w-md mx-auto">
          Você trabalha atualmente com um treinador pessoal ou nutricionista?
        </h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="space-y-3 max-w-md mx-auto w-full">
          <button
            onClick={() => handleSelect(true)}
            className={`w-full py-5 md:py-6 px-5 md:px-6 rounded-[16px] md:rounded-[20px] transition-all duration-200 flex items-center gap-4 ${
              answers.hasTrainer === true
                ? 'bg-[#1a1a1a] text-white'
                : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
            }`}
          >
            {/* Ícone de check melhorado */}
            <div className={`w-13 h-13 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              answers.hasTrainer === true ? 'bg-white shadow-md' : 'bg-white border-2 border-gray-300'
            }`}>
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M20 6L9 17l-5-5" 
                  stroke={answers.hasTrainer === true ? '#1a1a1a' : '#9ca3af'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-[17px] md:text-[18px] font-medium">Sim</span>
          </button>

          <button
            onClick={() => handleSelect(false)}
            className={`w-full py-5 md:py-6 px-5 md:px-6 rounded-[16px] md:rounded-[20px] transition-all duration-200 flex items-center gap-4 ${
              answers.hasTrainer === false
                ? 'bg-[#1a1a1a] text-white'
                : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
            }`}
          >
            {/* Ícone de X melhorado */}
            <div className={`w-13 h-13 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              answers.hasTrainer === false ? 'bg-white shadow-md' : 'bg-white border-2 border-gray-300'
            }`}>
              <svg 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M18 6L6 18M6 6l12 12" 
                  stroke={answers.hasTrainer === false ? '#1a1a1a' : '#9ca3af'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-[17px] md:text-[18px] font-medium">Não</span>
          </button>
        </div>
      </div>

      {/* Botão fixo no bottom */}
      <div className="px-6 pb-6 md:pb-8">
        <div className="max-w-md mx-auto w-full">
          <button
            onClick={handleContinue}
            disabled={answers.hasTrainer === undefined}
            className={`w-full py-4 md:py-5 px-6 rounded-[16px] md:rounded-[20px] font-semibold text-[16px] md:text-[17px] transition-all duration-200 ${
              answers.hasTrainer !== undefined
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
