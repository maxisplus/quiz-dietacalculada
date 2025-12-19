'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';
import { useState, useRef, useEffect } from 'react';

export default function HeightWeightStep() {
  const router = useRouter();
  const { updateAnswer, nextStep, currentStep, answers } = useQuizStore();
  
  const [heightCm, setHeightCm] = useState(answers.heightCm || 170);
  const [weightKg, setWeightKg] = useState(answers.weightKg || 70);

  // Refs para scroll automático
  const heightRef = useRef<HTMLDivElement>(null);
  const weightRef = useRef<HTMLDivElement>(null);

  // Gerar arrays de valores
  const cmOptions = Array.from({ length: 121 }, (_, i) => 120 + i); // 120-240 cm
  const kgOptions = Array.from({ length: 151 }, (_, i) => 30 + i); // 30-180 kg

  // Scroll para o valor selecionado ao montar
  useEffect(() => {
    const scrollToSelected = () => {
      // Scroll para altura em cm
      if (heightRef.current) {
        const index = cmOptions.indexOf(heightCm);
        const itemHeight = 48; // altura aproximada de cada item
        heightRef.current.scrollTop = Math.max(0, (index - 1) * itemHeight);
      }
      // Scroll para peso em kg
      if (weightRef.current) {
        const index = kgOptions.indexOf(weightKg);
        const itemHeight = 48;
        weightRef.current.scrollTop = Math.max(0, (index - 1) * itemHeight);
      }
    };
    
    setTimeout(scrollToSelected, 100);
  }, [heightCm, weightKg]);

  const handleContinue = () => {
    updateAnswer('heightCm', heightCm);
    updateAnswer('weightKg', weightKg);
    updateAnswer('unit', 'metric');
    nextStep();
    router.push(`/quiz/${currentStep + 1}`);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4">
        <h1 className="text-[32px] md:text-[40px] font-bold text-black mb-3 leading-tight max-w-md mx-auto">
          Altura e peso
        </h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="max-w-md mx-auto w-full">
          {/* Pickers */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Altura */}
            <div>
              <h3 className="text-[16px] md:text-[17px] font-semibold text-black mb-3 text-center">
                Altura (cm)
              </h3>
              
              <div className="relative">
                <div 
                  ref={heightRef}
                  className="h-44 overflow-y-scroll bg-[#f5f5f5] rounded-[16px] md:rounded-[20px] scrollbar-hide"
                >
                  {cmOptions.map((cm) => (
                    <button
                      key={cm}
                      onClick={() => setHeightCm(cm)}
                      className={`w-full py-3 text-center transition-all ${
                        heightCm === cm
                          ? 'bg-[#e5e5e5] text-black font-semibold text-[17px] md:text-[18px]'
                          : 'text-gray-400 text-[15px] md:text-[16px]'
                      }`}
                    >
                      {cm} cm
                    </button>
                  ))}
                </div>
                {/* Indicador de scroll */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#f5f5f5] to-transparent rounded-b-[16px] pointer-events-none flex items-end justify-center pb-1">
                  <svg className="w-4 h-4 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Peso */}
            <div>
              <h3 className="text-[16px] md:text-[17px] font-semibold text-black mb-3 text-center">
                Peso (kg)
              </h3>
              
              <div className="relative">
                <div 
                  ref={weightRef}
                  className="h-44 overflow-y-scroll bg-[#f5f5f5] rounded-[16px] md:rounded-[20px] scrollbar-hide"
                >
                  {kgOptions.map((kg) => (
                    <button
                      key={kg}
                      onClick={() => setWeightKg(kg)}
                      className={`w-full py-3 text-center transition-all ${
                        weightKg === kg
                          ? 'bg-[#e5e5e5] text-black font-semibold text-[17px] md:text-[18px]'
                          : 'text-gray-400 text-[15px] md:text-[16px]'
                      }`}
                    >
                      {kg} kg
                    </button>
                  ))}
                </div>
                {/* Indicador de scroll */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#f5f5f5] to-transparent rounded-b-[16px] pointer-events-none flex items-end justify-center pb-1">
                  <svg className="w-4 h-4 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botão fixo no bottom */}
      <div className="px-6 pb-6 md:pb-8">
        <div className="max-w-md mx-auto w-full">
          <button
            onClick={handleContinue}
            className="w-full py-4 md:py-5 px-6 rounded-[16px] md:rounded-[20px] font-semibold text-[16px] md:text-[17px] transition-all duration-200 bg-[#1a1a1a] text-white active:bg-black hover:bg-gray-800"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

