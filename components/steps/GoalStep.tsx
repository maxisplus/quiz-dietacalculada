'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';

const goals = [
  { 
    id: 'perder', 
    label: 'Perder peso'
  },
  { 
    id: 'manter', 
    label: 'Manter'
  },
  { 
    id: 'ganhar', 
    label: 'Ganhar peso'
  },
];

export default function GoalStep() {
  const router = useRouter();
  const { updateAnswer, nextStep, currentStep, answers } = useQuizStore();

  const handleSelect = (goalId: string) => {
    updateAnswer('goal', goalId);
  };

  const handleContinue = () => {
    if (answers.goal) {
      nextStep();
      router.push(`/quiz/${currentStep + 1}`);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-4">
        <h1 className="text-[32px] md:text-[40px] font-bold text-black mb-3 leading-tight max-w-md mx-auto">
          Qual é o seu objetivo?
        </h1>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="space-y-3 max-w-md mx-auto w-full">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => handleSelect(goal.id)}
                className={`w-full py-5 md:py-6 px-6 rounded-[16px] md:rounded-[20px] transition-all duration-200 text-left ${
                  answers.goal === goal.id
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
                }`}
              >
                <div className="text-[17px] md:text-[18px] font-medium">
                  {goal.label}
                </div>
              </button>
          ))}
        </div>
      </div>

      {/* Botão fixo no bottom */}
      <div className="px-6 pb-6 md:pb-8">
        <div className="max-w-md mx-auto w-full">
          <button
            onClick={handleContinue}
            disabled={!answers.goal}
            className={`w-full py-4 md:py-5 px-6 rounded-[16px] md:rounded-[20px] font-semibold text-[16px] md:text-[17px] transition-all duration-200 ${
              answers.goal
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
