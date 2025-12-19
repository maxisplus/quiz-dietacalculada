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
            className={`w-full py-4 md:py-5 px-4 md:px-5 rounded-[16px] md:rounded-[20px] transition-all duration-200 flex items-center gap-4 ${
              answers.triedOtherApps === true
                ? 'bg-[#1a1a1a] text-white shadow-lg'
                : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
            }`}
          >
            {/* Emoji Icon */}
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all ${
              answers.triedOtherApps === true ? 'bg-green-500' : 'bg-green-100'
            }`}>
              <span className="text-[28px] md:text-[32px]">✅</span>
            </div>
            
            <span className={`text-[17px] md:text-[18px] font-semibold flex-1 ${
              answers.triedOtherApps === true ? 'text-white' : 'text-black'
            }`}>
              Sim, já tentei
            </span>

            {/* Indicador de seleção */}
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              answers.triedOtherApps === true 
                ? 'border-white bg-white' 
                : 'border-gray-300'
            }`}>
              {answers.triedOtherApps === true && (
                <svg className="w-4 h-4 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>

          <button
            onClick={() => handleSelect(false)}
            className={`w-full py-4 md:py-5 px-4 md:px-5 rounded-[16px] md:rounded-[20px] transition-all duration-200 flex items-center gap-4 ${
              answers.triedOtherApps === false
                ? 'bg-[#1a1a1a] text-white shadow-lg'
                : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
            }`}
          >
            {/* Emoji Icon */}
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all ${
              answers.triedOtherApps === false ? 'bg-blue-500' : 'bg-blue-100'
            }`}>
              <span className="text-[28px] md:text-[32px]">❌</span>
            </div>
            
            <span className={`text-[17px] md:text-[18px] font-semibold flex-1 ${
              answers.triedOtherApps === false ? 'text-white' : 'text-black'
            }`}>
              Não, é minha primeira vez
            </span>

            {/* Indicador de seleção */}
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              answers.triedOtherApps === false 
                ? 'border-white bg-white' 
                : 'border-gray-300'
            }`}>
              {answers.triedOtherApps === false && (
                <svg className="w-4 h-4 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
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
