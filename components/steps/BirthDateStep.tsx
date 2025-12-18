'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';

export default function BirthDateStep() {
  const router = useRouter();
  const { updateAnswer, nextStep, currentStep, answers } = useQuizStore();
  const [day, setDay] = useState(answers.birthDate?.getDate() || 1);
  const [month, setMonth] = useState(
    answers.birthDate?.getMonth() !== undefined
      ? answers.birthDate.getMonth() + 1
      : 1
  );
  const [year, setYear] = useState(
    answers.birthDate?.getFullYear() || 2000
  );

  // Refs para scroll automático
  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const years = Array.from(
    { length: 80 },
    (_, i) => new Date().getFullYear() - 10 - i
  );

  // Scroll para o valor selecionado ao montar
  useEffect(() => {
    const scrollToSelected = () => {
      const itemHeight = 56; // altura aproximada de cada item (py-4 = 16px * 2 + font)
      
      // Scroll para o mês
      if (monthRef.current) {
        monthRef.current.scrollTop = Math.max(0, (month - 2) * itemHeight);
      }
      
      // Scroll para o dia
      if (dayRef.current) {
        dayRef.current.scrollTop = Math.max(0, (day - 2) * itemHeight);
      }
      
      // Scroll para o ano
      if (yearRef.current) {
        const yearIndex = years.indexOf(year);
        yearRef.current.scrollTop = Math.max(0, (yearIndex - 1) * itemHeight);
      }
    };
    
    setTimeout(scrollToSelected, 100);
  }, []);

  const handleContinue = () => {
    const birthDate = new Date(year, month - 1, day);
    updateAnswer('birthDate', birthDate);
    nextStep();
    router.push(`/quiz/${currentStep + 1}`);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4">
        <h1 className="text-[32px] md:text-[40px] font-bold text-black mb-3 leading-tight max-w-md mx-auto">
          Quando você nasceu?
        </h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="max-w-md mx-auto w-full">
          <div className="flex gap-3 justify-center">
            {/* Month */}
            <div className="flex-1 relative">
              <div 
                ref={monthRef}
                className="h-48 overflow-y-scroll scrollbar-hide bg-[#f5f5f5] rounded-[16px] md:rounded-[20px]"
              >
                {months.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMonth(idx + 1)}
                    className={`w-full py-4 px-4 text-left transition-all ${
                      month === idx + 1
                        ? 'bg-[#e5e5e5] text-black font-semibold text-[17px] md:text-[18px]'
                        : 'text-gray-400 text-[15px] md:text-[16px]'
                    }`}
                  >
                    {m}
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

            {/* Day */}
            <div className="w-20 relative">
              <div 
                ref={dayRef}
                className="h-48 overflow-y-scroll scrollbar-hide bg-[#f5f5f5] rounded-[16px] md:rounded-[20px]"
              >
                {days.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDay(d)}
                    className={`w-full py-4 text-center transition-all ${
                      day === d
                        ? 'bg-[#e5e5e5] text-black font-semibold text-[17px] md:text-[18px]'
                        : 'text-gray-400 text-[15px] md:text-[16px]'
                    }`}
                  >
                    {d}
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

            {/* Year */}
            <div className="w-24 relative">
              <div 
                ref={yearRef}
                className="h-48 overflow-y-scroll scrollbar-hide bg-[#f5f5f5] rounded-[16px] md:rounded-[20px]"
              >
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className={`w-full py-4 text-center transition-all ${
                      year === y
                        ? 'bg-[#e5e5e5] text-black font-semibold text-[17px] md:text-[18px]'
                        : 'text-gray-400 text-[15px] md:text-[16px]'
                    }`}
                  >
                    {y}
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
