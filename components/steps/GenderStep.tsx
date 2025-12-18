'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/quizStore';
import Button from '@/components/Button';

const genders = [
  { id: 'masculino', label: 'Masculino' },
  { id: 'feminino', label: 'Feminino' },
  { id: 'outro', label: 'Outro' },
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
          {genders.map((gender) => (
            <button
              key={gender.id}
              onClick={() => handleSelect(gender.id)}
              className={`w-full py-4 md:py-5 px-6 rounded-[16px] md:rounded-[20px] transition-all duration-200 text-center font-medium text-[16px] md:text-[17px] ${
                answers.gender === gender.id
                  ? 'bg-[#1a1a1a] text-white'
                  : 'bg-[#f5f5f5] text-black active:bg-gray-200 hover:bg-gray-200'
              }`}
            >
              {gender.label}
            </button>
          ))}
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

