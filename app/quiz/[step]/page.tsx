'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useQuizStore } from '@/store/quizStore';
import QuizLayout from '@/components/QuizLayout';
import DietTypeStep from '@/components/steps/DietTypeStep';
import BirthDateStep from '@/components/steps/BirthDateStep';
import GenderStep from '@/components/steps/GenderStep';
import WorkoutsStep from '@/components/steps/WorkoutsStep';
import TrainerStep from '@/components/steps/TrainerStep';
import GoalStep from '@/components/steps/GoalStep';
import ObstaclesStep from '@/components/steps/ObstaclesStep';
import TriedAppsStep from '@/components/steps/TriedAppsStep';
import LongTermResultsStep from '@/components/steps/LongTermResultsStep';
import ContactInfoStep from '@/components/steps/ContactInfoStep';
import HeightWeightStep from '@/components/steps/HeightWeightStep';
import AchievementsStep from '@/components/steps/AchievementsStep';
import ThankYouStep from '@/components/steps/ThankYouStep';

const steps = [
  GenderStep,           // Etapa 0 - Primeira etapa
  WorkoutsStep,         // Etapa 1 - Segunda etapa
  TriedAppsStep,        // Etapa 2 - Terceira etapa
  LongTermResultsStep,  // Etapa 3 - Quarta etapa
  ContactInfoStep,      // Etapa 4 - Quinta etapa (NOVO)
  HeightWeightStep,     // Etapa 5 - Sexta etapa
  BirthDateStep,        // Etapa 6 - Sétima etapa
  TrainerStep,          // Etapa 7 - Oitava etapa
  GoalStep,             // Etapa 8 - Nona etapa
  ObstaclesStep,        // Etapa 9 - Décima etapa
  DietTypeStep,         // Etapa 10 - Décima primeira etapa
  AchievementsStep,     // Etapa 11 - Décima segunda etapa
  ThankYouStep,         // Etapa 12 - Décima terceira etapa
];

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { setCurrentStep, totalSteps } = useQuizStore();
  const step = parseInt(params.step as string, 10);

  useEffect(() => {
    if (isNaN(step) || step < 0 || step >= totalSteps) {
      router.push('/quiz/0');
      return;
    }
    setCurrentStep(step);
  }, [step, setCurrentStep, totalSteps, router]);

  const CurrentStepComponent = steps[step];

  if (!CurrentStepComponent) {
    return null;
  }

  return (
    <QuizLayout showBackButton={step > 0}>
      <CurrentStepComponent />
    </QuizLayout>
  );
}

