'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';

export default function TriedAppsStep() {
  const router = useRouter();
  const { updateAnswer, nextStep, currentStep, answers } = useQuizStore();

  const handleSelect = (triedApps: boolean) => {
    updateAnswer('triedOtherApps', triedApps);
  };

  const handleContinue = () => {
    if (answers.triedOtherApps !== undefined) {
      nextStep();
      router.push(`/quiz/${currentStep + 1}`);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4">
        <h1 className="text-[32px] md:text-[40px] font-bold text-black mb-3 leading-tight max-w-md mx-auto">
          Você já tentou outros apps de contagem de calorias?
        </h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="space-y-3 max-w-md mx-auto w-full">
          <button
            onClick={() => handleSelect(true)}
            className={`w-full py-4 md:py-5 px-4 md:px-6 rounded-[16px] md:rounded-[20px] transition-all duration-200 text-left flex items-center gap-4 ${
              answers.triedOtherApps === true
                ? 'bg-[#1a1a1a] text-white'
                : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
            }`}
          >
            {/* Ícone de check */}
            <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
              answers.triedOtherApps === true ? 'bg-green-500' : 'bg-white border border-gray-200'
            }`}>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={answers.triedOtherApps === true ? 'white' : '#22c55e'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12l5 5L19 7"/>
              </svg>
            </div>
            <span className="text-[16px] md:text-[17px] font-medium">Sim, já tentei</span>
          </button>

          <button
            onClick={() => handleSelect(false)}
            className={`w-full py-4 md:py-5 px-4 md:px-6 rounded-[16px] md:rounded-[20px] transition-all duration-200 text-left flex items-center gap-4 ${
              answers.triedOtherApps === false
                ? 'bg-[#1a1a1a] text-white'
                : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
            }`}
          >
            {/* Ícone de X */}
            <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
              answers.triedOtherApps === false ? 'bg-gray-500' : 'bg-white border border-gray-200'
            }`}>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={answers.triedOtherApps === false ? 'white' : '#6b7280'}
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18"/>
              </svg>
            </div>
            <span className="text-[16px] md:text-[17px] font-medium">Não, é minha primeira vez</span>
          </button>
        </div>
      </div>

      {/* Botão fixo no bottom */}
      <div className="px-6 pb-6 md:pb-8">
        <div className="max-w-md mx-auto w-full">
          <button
            onClick={handleContinue}
            disabled={answers.triedOtherApps === undefined}
            className={`w-full py-4 md:py-5 px-6 rounded-[16px] md:rounded-[20px] font-semibold text-[16px] md:text-[17px] transition-all duration-200 ${
              answers.triedOtherApps !== undefined
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

