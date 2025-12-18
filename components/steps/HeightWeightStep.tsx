'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';
import { useState, useRef, useEffect } from 'react';

export default function HeightWeightStep() {
  const router = useRouter();
  const { updateAnswer, nextStep, currentStep, answers } = useQuizStore();
  
  // Começa com Métrico por padrão
  const [unit, setUnit] = useState<'imperial' | 'metric'>(answers.unit || 'metric');
  const [heightFt, setHeightFt] = useState(answers.heightFt || 5);
  const [heightIn, setHeightIn] = useState(answers.heightIn || 8);
  const [heightCm, setHeightCm] = useState(answers.heightCm || 170);
  const [weightLb, setWeightLb] = useState(answers.weightLb || 150);
  const [weightKg, setWeightKg] = useState(answers.weightKg || 70);

  // Refs para scroll automático
  const heightRef = useRef<HTMLDivElement>(null);
  const weightRef = useRef<HTMLDivElement>(null);

  // Gerar arrays de valores
  const feetOptions = Array.from({ length: 5 }, (_, i) => 4 + i); // 4-8 ft
  const inchOptions = Array.from({ length: 12 }, (_, i) => i); // 0-11 in
  const cmOptions = Array.from({ length: 121 }, (_, i) => 120 + i); // 120-240 cm
  const lbOptions = Array.from({ length: 301 }, (_, i) => 50 + i); // 50-350 lb
  const kgOptions = Array.from({ length: 151 }, (_, i) => 30 + i); // 30-180 kg

  // Scroll para o valor selecionado ao montar
  useEffect(() => {
    const scrollToSelected = () => {
      if (unit === 'metric') {
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
      }
    };
    
    setTimeout(scrollToSelected, 100);
  }, [unit, heightCm, weightKg]);

  const handleContinue = () => {
    if (unit === 'imperial') {
      updateAnswer('heightFt', heightFt);
      updateAnswer('heightIn', heightIn);
      updateAnswer('weightLb', weightLb);
      updateAnswer('unit', 'imperial');
    } else {
      updateAnswer('heightCm', heightCm);
      updateAnswer('weightKg', weightKg);
      updateAnswer('unit', 'metric');
    }
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
          {/* Toggle Imperial/Métrico */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setUnit('imperial')}
              className={`text-[16px] md:text-[17px] font-semibold transition-colors ${
                unit === 'imperial' ? 'text-black' : 'text-gray-400'
              }`}
            >
              Imperial
            </button>
            
            <button
              onClick={() => setUnit(unit === 'imperial' ? 'metric' : 'imperial')}
              className="relative w-14 h-8 rounded-full transition-colors"
              style={{ backgroundColor: unit === 'metric' ? '#1a1a1a' : '#d1d5db' }}
            >
              <div
                className="absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200"
                style={{
                  transform: unit === 'metric' ? 'translateX(26px)' : 'translateX(4px)',
                }}
              />
            </button>
            
            <button
              onClick={() => setUnit('metric')}
              className={`text-[16px] md:text-[17px] font-semibold transition-colors ${
                unit === 'metric' ? 'text-black' : 'text-gray-400'
              }`}
            >
              Métrico
            </button>
          </div>

          {/* Pickers */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Altura */}
            <div>
              <h3 className="text-[16px] md:text-[17px] font-semibold text-black mb-3 text-center">
                Altura
              </h3>
              
              {unit === 'imperial' ? (
                <div className="flex gap-2">
                  {/* Pés */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className="h-44 overflow-y-scroll bg-[#f5f5f5] rounded-[16px] md:rounded-[20px] scrollbar-hide">
                        {feetOptions.map((ft) => (
                          <button
                            key={ft}
                            onClick={() => setHeightFt(ft)}
                            className={`w-full py-3 text-center transition-all ${
                              heightFt === ft
                                ? 'bg-[#e5e5e5] text-black font-semibold text-[17px] md:text-[18px]'
                                : 'text-gray-400 text-[15px] md:text-[16px]'
                            }`}
                          >
                            {ft} ft
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
                  
                  {/* Polegadas */}
                  <div className="flex-1">
                    <div className="relative">
                      <div className="h-44 overflow-y-scroll bg-[#f5f5f5] rounded-[16px] md:rounded-[20px] scrollbar-hide">
                        {inchOptions.map((inch) => (
                          <button
                            key={inch}
                            onClick={() => setHeightIn(inch)}
                            className={`w-full py-3 text-center transition-all ${
                              heightIn === inch
                                ? 'bg-[#e5e5e5] text-black font-semibold text-[17px] md:text-[18px]'
                                : 'text-gray-400 text-[15px] md:text-[16px]'
                            }`}
                          >
                            {inch} in
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
              ) : (
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
              )}
            </div>

            {/* Peso */}
            <div>
              <h3 className="text-[16px] md:text-[17px] font-semibold text-black mb-3 text-center">
                Peso
              </h3>
              
              {unit === 'imperial' ? (
                <div className="relative">
                  <div className="h-44 overflow-y-scroll bg-[#f5f5f5] rounded-[16px] md:rounded-[20px] scrollbar-hide">
                    {lbOptions.map((lb) => (
                      <button
                        key={lb}
                        onClick={() => setWeightLb(lb)}
                        className={`w-full py-3 text-center transition-all ${
                          weightLb === lb
                            ? 'bg-[#e5e5e5] text-black font-semibold text-[17px] md:text-[18px]'
                            : 'text-gray-400 text-[15px] md:text-[16px]'
                        }`}
                      >
                        {lb} lb
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
              ) : (
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
              )}
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

