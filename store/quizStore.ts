import { create } from 'zustand';

export interface QuizAnswers {
  // Dados pessoais
  referralCode?: string;
  name?: string;
  email?: string;
  phone?: string;
  
  // Dados físicos
  birthDate?: Date;
  gender?: 'masculino' | 'feminino' | 'outro';
  unit?: 'imperial' | 'metric';
  heightFt?: number;
  heightIn?: number;
  heightCm?: number;
  weightLb?: number;
  weightKg?: number;
  desiredWeightKg?: number;
  
  // Objetivos e preferências
  goal?: 'perder' | 'manter' | 'ganhar';
  weightSpeedPerWeek?: number;
  dietType?: 'classico' | 'pescetariano' | 'vegetariano' | 'vegano';
  workoutsPerWeek?: '0-2' | '3-5' | '6+';
  hasTrainer?: 'nao-treino' | 'ajuda-academia' | 'montar-proprios' | 'copiar-treino' | 'plano-online' | 'personal-online' | 'personal-presencial';
  dietHelper?: 'nao-faco-dieta' | 'seguir-intuicao' | 'montar-propria' | 'copiar-dieta' | 'plano-online' | 'nutricionista-online' | 'nutricionista-presencial';
  achievements?: string[];
  obstacles?: string[];
  
  // Marketing
  heardFrom?: string;
  triedOtherApps?: boolean;
  
  // Configurações
  addBurnedCalories?: boolean;
  transferExtraCalories?: boolean;
  
  // UTMs e tracking
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landingPage?: string;
  userAgent?: string;
  ipAddress?: string;
}

interface QuizStore {
  currentStep: number;
  answers: QuizAnswers;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  updateAnswer: (key: keyof QuizAnswers, value: any) => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
}

const initialAnswers: QuizAnswers = {};

export const useQuizStore = create<QuizStore>((set) => ({
  currentStep: 0,
  answers: initialAnswers,
  totalSteps: 23,
  setCurrentStep: (step) => set({ currentStep: step }),
  updateAnswer: (key, value) =>
    set((state) => ({
      answers: { ...state.answers, [key]: value },
    })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
    })),
  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
  reset: () => set({ currentStep: 0, answers: initialAnswers }),
}));

