'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';
import { useEffect, useState } from 'react';

export default function LongTermResultsStep() {
  const router = useRouter();
  const { nextStep, currentStep } = useQuizStore();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Iniciar animação após montar
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    nextStep();
    router.push(`/quiz/${currentStep + 1}`);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4">
        <h1 className="text-[32px] md:text-[40px] font-bold text-black mb-3 leading-tight max-w-md mx-auto">
          Dieta Calculada cria resultados a longo prazo
        </h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="max-w-md mx-auto w-full">
          {/* Gráfico */}
          <div className="bg-[#f5f5f5] rounded-[20px] p-6 mb-4">
            <div className="mb-4">
              <p className="text-[15px] md:text-[16px] text-gray-600 mb-4">Seu peso</p>
              
              {/* SVG do gráfico com animação */}
              <svg viewBox="0 0 320 180" className="w-full h-auto">
                <defs>
                  {/* Definição das animações */}
                  <style>
                    {`
                      .line-red {
                        stroke-dasharray: 400;
                        stroke-dashoffset: ${isAnimated ? '0' : '400'};
                        transition: stroke-dashoffset 2s ease-out;
                      }
                      .line-black {
                        stroke-dasharray: 400;
                        stroke-dashoffset: ${isAnimated ? '0' : '400'};
                        transition: stroke-dashoffset 2s ease-out 0.3s;
                      }
                      .point-start {
                        opacity: ${isAnimated ? '1' : '0'};
                        transition: opacity 0.5s ease-out;
                      }
                      .point-end {
                        opacity: ${isAnimated ? '1' : '0'};
                        transition: opacity 0.5s ease-out 2s;
                      }
                      .label-red {
                        opacity: ${isAnimated ? '1' : '0'};
                        transition: opacity 0.5s ease-out 1s;
                      }
                      .badge {
                        opacity: ${isAnimated ? '1' : '0'};
                        transform: ${isAnimated ? 'translateY(0)' : 'translateY(10px)'};
                        transition: all 0.5s ease-out 1.5s;
                      }
                    `}
                  </style>
                </defs>

                {/* Grid lines */}
                <line x1="20" y1="40" x2="300" y2="40" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="4 4"/>
                <line x1="20" y1="90" x2="300" y2="90" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="4 4"/>
                <line x1="20" y1="140" x2="300" y2="140" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="4 4"/>
                
                {/* Linha vermelha - Dieta tradicional */}
                <path 
                  className="line-red"
                  d="M 20,40 Q 80,100 140,80 T 300,20" 
                  fill="none" 
                  stroke="#ff6b6b" 
                  strokeWidth="3"
                />
                
                {/* Linha preta - Dieta Calculada */}
                <path 
                  className="line-black"
                  d="M 20,40 Q 100,60 160,80 Q 220,100 280,120" 
                  fill="none" 
                  stroke="#1a1a1a" 
                  strokeWidth="3"
                />
                
                {/* Ponto inicial */}
                <circle className="point-start" cx="20" cy="40" r="6" fill="#1a1a1a" stroke="white" strokeWidth="2"/>
                
                {/* Ponto final Dieta Calculada */}
                <circle className="point-end" cx="280" cy="120" r="6" fill="#1a1a1a" stroke="white" strokeWidth="2"/>
                
                {/* Label Dieta tradicional */}
                <text className="label-red" x="250" y="35" fontSize="12" fill="#ff6b6b" textAnchor="middle" fontWeight="500">
                  Dieta tradicional
                </text>
                
                {/* Badge Dieta Calculada */}
                <g className="badge" transform="translate(120, 95)">
                  <rect x="0" y="0" width="130" height="26" rx="13" fill="#1a1a1a"/>
                  <text x="14" y="17" fontSize="11" fill="white" fontWeight="600">
                    🍎 Dieta Calculada
                  </text>
                </g>
                
                {/* Eixo X labels */}
                <text x="20" y="165" fontSize="13" fill="#666" textAnchor="start">Mês 1</text>
                <text x="280" y="165" fontSize="13" fill="#666" textAnchor="end">Mês 6</text>
                
                {/* Label "Peso" */}
                <text x="5" y="90" fontSize="11" fill="#999" textAnchor="middle" transform="rotate(-90, 12, 90)">Peso</text>
              </svg>
            </div>
            
            <p className={`text-[14px] md:text-[15px] text-center text-gray-700 leading-relaxed transition-opacity duration-500 ${isAnimated ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '2s' }}>
              80% dos usuários do Dieta Calculada mantêm seu resultado mesmo 6 meses depois
            </p>
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

