'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';
import { useEffect, useState } from 'react';

export default function FinalStep() {
  const router = useRouter();
  const { answers } = useQuizStore();
  const [isCalculating, setIsCalculating] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsCalculating(false), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const calculatePlan = () => {
    const age = answers.birthDate
      ? new Date().getFullYear() - answers.birthDate.getFullYear()
      : 30;
    const isMale = answers.gender === 'masculino';
    const baseCalories = isMale ? 2000 : 1800;

    let calories = baseCalories;
    if (answers.goal === 'perder') calories -= 500;
    if (answers.goal === 'ganhar') calories += 500;

    const protein = Math.round(calories * 0.25 / 4);
    const carbs = Math.round(calories * 0.45 / 4);
    const fats = Math.round(calories * 0.30 / 9);

    return { calories, protein, carbs, fats };
  };

  const plan = calculatePlan();

  if (isCalculating) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center px-6 bg-white">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gray-900 flex items-center justify-center mb-6">
          <span className="text-4xl md:text-5xl">🎯</span>
        </div>
        
        <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
          {progress}%
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Calculando seu plano
        </h2>
        
        <p className="text-gray-500 text-sm md:text-base mb-6 text-center">
          {progress < 40 && 'Analisando suas respostas...'}
          {progress >= 40 && progress < 70 && 'Aplicando fórmula de TMB...'}
          {progress >= 70 && 'Gerando recomendações...'}
        </p>
        
        <div className="w-full max-w-md md:max-w-lg">
          <div className="h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      <div className="flex-1 flex flex-col justify-center px-6 py-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto w-full">
          <div className="text-center mb-6">
            <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-7 h-7 md:w-9 md:h-9 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Parabéns! 🎉
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Seu plano personalizado está pronto
            </p>
          </div>

          <div>
            <div className="text-center mb-4">
              <span className="text-xs md:text-sm text-gray-600 block mb-2">Seu objetivo:</span>
              <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full font-semibold text-sm md:text-base">
                {answers.goal === 'perder' && '📉 Perder Peso'}
                {answers.goal === 'manter' && '⚖️ Manter Peso'}
                {answers.goal === 'ganhar' && '📈 Ganhar Peso'}
              </div>
            </div>

            <div className="bg-gray-100 rounded-3xl p-4 md:p-6 mb-4">
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 text-center">
                Recomendação Diária
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
                <div className="bg-white rounded-2xl p-3 md:p-4 text-center">
                  <div className="text-xl md:text-2xl mb-1">🔥</div>
                  <div className="text-xs md:text-sm text-gray-600 mb-1">Calorias</div>
                  <div className="text-lg md:text-xl font-bold text-gray-900">{plan.calories}</div>
                </div>

                <div className="bg-white rounded-2xl p-3 md:p-4 text-center">
                  <div className="text-xl md:text-2xl mb-1">🌾</div>
                  <div className="text-xs md:text-sm text-gray-600 mb-1">Carboidratos</div>
                  <div className="text-lg md:text-xl font-bold text-gray-900">{plan.carbs}g</div>
                </div>

                <div className="bg-white rounded-2xl p-3 md:p-4 text-center">
                  <div className="text-xl md:text-2xl mb-1">💧</div>
                  <div className="text-xs md:text-sm text-gray-600 mb-1">Proteína</div>
                  <div className="text-lg md:text-xl font-bold text-gray-900">{plan.protein}g</div>
                </div>

                <div className="bg-white rounded-2xl p-3 md:p-4 text-center">
                  <div className="text-xl md:text-2xl mb-1">🥑</div>
                  <div className="text-xs md:text-sm text-gray-600 mb-1">Gorduras</div>
                  <div className="text-lg md:text-xl font-bold text-gray-900">{plan.fats}g</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 md:p-4">
              <div className="flex gap-2.5 md:gap-3">
                <div className="text-lg md:text-xl">💡</div>
                <div className="flex-1">
                  <p className="text-xs md:text-sm font-medium text-blue-900 mb-1">
                    Dica Profissional
                  </p>
                  <p className="text-xs md:text-sm text-blue-700">
                    Você pode editar esses valores a qualquer momento
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 md:pb-8">
        <div className="max-w-2xl mx-auto w-full">
          <button
            onClick={() => {
              alert('Quiz concluído! Aqui você integraria com sua API.');
              router.push('/');
            }}
            className="w-full py-4 md:py-5 px-6 rounded-[16px] md:rounded-[20px] font-semibold text-[16px] md:text-[17px] transition-all duration-200 bg-[#1a1a1a] text-white hover:bg-gray-800"
          >
            Vamos começar! 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
