'use client';

import { useQuizStore } from '@/store/quizStore';

export default function ThankYouStep() {
  const { answers } = useQuizStore();

  // Montar mensagem do WhatsApp com os dados do quiz
  const buildWhatsAppMessage = () => {
    const goalMap: Record<string, string> = {
      perder: 'Perder peso',
      manter: 'Manter peso',
      ganhar: 'Ganhar peso',
    };

    const genderMap: Record<string, string> = {
      masculino: 'Masculino',
      feminino: 'Feminino',
      outro: 'Outro',
    };

    const dietMap: Record<string, string> = {
      classico: 'Clássico',
      pescetariano: 'Pescetariano',
      vegetariano: 'Vegetariano',
      vegano: 'Vegano',
    };

    let message = `🥗 *Olá! Completei o quiz da Dieta Calculada!*\n\n`;
    message += `📋 *Minhas informações:*\n`;
    
    if (answers.gender) {
      message += `• Gênero: ${genderMap[answers.gender] || answers.gender}\n`;
    }
    
    if (answers.birthDate) {
      const age = new Date().getFullYear() - new Date(answers.birthDate).getFullYear();
      message += `• Idade: ${age} anos\n`;
    }
    
    if (answers.unit === 'metric') {
      if (answers.heightCm) message += `• Altura: ${answers.heightCm} cm\n`;
      if (answers.weightKg) message += `• Peso: ${answers.weightKg} kg\n`;
    } else {
      if (answers.heightFt) message += `• Altura: ${answers.heightFt}'${answers.heightIn || 0}"\n`;
      if (answers.weightLb) message += `• Peso: ${answers.weightLb} lb\n`;
    }
    
    if (answers.goal) {
      message += `• Objetivo: ${goalMap[answers.goal] || answers.goal}\n`;
    }
    
    if (answers.workoutsPerWeek) {
      message += `• Treinos por semana: ${answers.workoutsPerWeek}\n`;
    }
    
    if (answers.dietType) {
      message += `• Tipo de dieta: ${dietMap[answers.dietType] || answers.dietType}\n`;
    }
    
    message += `\n✨ Gostaria de receber meu plano alimentar personalizado!`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsApp = () => {
    // Substitua pelo número do WhatsApp da Dieta Calculada
    const phoneNumber = '5511999999999'; // Formato: código do país + DDD + número
    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Conteúdo */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-md mx-auto w-full text-center">
          {/* Ilustração de sucesso */}
          <div className="relative w-52 h-52 md:w-64 md:h-64 mx-auto mb-8">
            {/* Círculos de fundo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 opacity-60"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-50 via-white to-emerald-50 opacity-80"></div>
            
            {/* Ícone de check/sucesso */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="md:w-32 md:h-32">
                {/* Círculo de fundo */}
                <circle cx="50" cy="50" r="40" fill="#22c55e" opacity="0.1"/>
                <circle cx="50" cy="50" r="30" fill="#22c55e" opacity="0.2"/>
                
                {/* Check mark */}
                <path 
                  d="M30 50 L45 65 L70 35" 
                  stroke="#22c55e" 
                  strokeWidth="6" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                
                {/* Estrelas decorativas */}
                <circle cx="20" cy="25" r="2" fill="#22c55e"/>
                <circle cx="80" cy="25" r="2" fill="#22c55e"/>
                <circle cx="15" cy="50" r="1.5" fill="#22c55e"/>
                <circle cx="85" cy="50" r="1.5" fill="#22c55e"/>
                <circle cx="25" cy="75" r="1.5" fill="#22c55e"/>
                <circle cx="75" cy="75" r="1.5" fill="#22c55e"/>
              </svg>
            </div>
          </div>

          {/* Título */}
          <h1 className="text-[28px] md:text-[36px] font-bold text-black mb-3 leading-tight">
            Seu perfil está pronto!
          </h1>
          
          {/* Descrição */}
          <p className="text-gray-500 text-[15px] md:text-base mb-8">
            Clique no botão abaixo para falar com nossa equipe e receber seu plano alimentar personalizado.
          </p>

          {/* Card informativo */}
          <div className="bg-[#f0fdf4] rounded-[20px] p-5 md:p-6 border border-green-100">
            {/* Ícone WhatsApp */}
            <div className="w-12 h-12 mx-auto mb-3 bg-[#25D366] rounded-2xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            
            <p className="text-[15px] md:text-[16px] font-semibold text-black mb-2">
              Atendimento rápido via WhatsApp
            </p>
            <p className="text-[13px] md:text-[14px] text-gray-500">
              Nossa equipe irá analisar suas respostas e criar um plano exclusivo para você.
            </p>
          </div>
        </div>
      </div>

      {/* Botão WhatsApp fixo no bottom */}
      <div className="px-6 pb-6 md:pb-8">
        <div className="max-w-md mx-auto w-full">
          <button
            onClick={handleWhatsApp}
            className="w-full py-4 md:py-5 px-6 rounded-[16px] md:rounded-[20px] font-semibold text-[16px] md:text-[17px] transition-all duration-200 bg-[#25D366] text-white active:bg-[#1da851] hover:bg-[#20bd5a] flex items-center justify-center gap-3"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

