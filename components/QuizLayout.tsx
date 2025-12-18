import React from 'react';
import ProgressBar from './ProgressBar';
import { useQuizStore } from '@/store/quizStore';
import { useRouter } from 'next/navigation';

interface QuizLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

export default function QuizLayout({
  children,
  showBackButton = true,
}: QuizLayoutProps) {
  const { currentStep, totalSteps, previousStep } = useQuizStore();
  const router = useRouter();

  const handleBack = () => {
    previousStep();
    router.push(`/quiz/${currentStep - 1}`);
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header com progress bar */}
      <div className="flex-shrink-0 px-4 md:px-6 pt-3 md:pt-4 pb-2">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          {showBackButton ? (
            <button
              onClick={handleBack}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-200"
              aria-label="Voltar"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          ) : (
            <div className="w-10 md:w-11"></div>
          )}
          <div className="flex-1">
            <ProgressBar current={currentStep + 1} total={totalSteps} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

