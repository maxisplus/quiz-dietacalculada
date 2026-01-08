# 🥗 Quiz Dieta Calculada

Quiz interativo e moderno para criar planos de dieta personalizados.

## ✨ Melhorias Implementadas

### 🎨 Design Minimalista e Consistente
- Background branco limpo em todas as etapas
- Botões com design uniforme (cinza escuro/claro)
- Transições suaves de 200ms
- Feedback visual ao clicar (active states)
- Sem gradientes excessivos ou efeitos desnecessários

### 📱 Layout Responsivo
- Espaçamentos otimizados para mobile e desktop
- Tipografia responsiva (text-2xl sm:text-3xl)
- Grid adaptável na tela de redes sociais
- Seletores de data scrolláveis e intuitivos

### 🚀 Funcionalidades

**11 Etapas Completas:**
1. ✅ **Gênero** - Masculino, Feminino, Outro
2. ✅ **Treinos por semana** - 0-2, 3-5, 6+ (com ícones personalizados)
3. ✅ **Data de nascimento** - Seletor triple (dia/mês/ano)
4. ✅ **Tipo de dieta** - Clássico, Pescetariano, Vegetariano, Vegano
5. ✅ **Objetivo** - Perder, Manter ou Ganhar peso
6. ✅ **Profissional** - Trabalha com treinador/nutricionista
7. ✅ **Conquistas** - Múltipla escolha de objetivos
8. ✅ **Obstáculos** - Identificar barreiras
9. ✅ **Onde ouviu falar** - Grid de redes sociais
10. ✅ **Código de referência** - Opcional com botão "Aplicar"
11. ✅ **Resultado** - Plano personalizado com macronutrientes

### 🎯 Experiência do Usuário
- Barra de progresso minimalista no topo
- Botão voltar funcional em todas as etapas
- Validação em tempo real dos botões
- Estados disabled visuais claros
- Loading screen com progresso animado
- Tela final com resultados calculados

### 🏗️ Arquitetura
- Next.js 14 com App Router
- TypeScript para segurança de tipos
- Zustand para estado global
- Tailwind CSS utilitário
- Componentes reutilizáveis e limpos

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

## 🎨 Paleta de Cores

```css
Primária: #111827 (gray-900)
Secundária: #f3f4f6 (gray-100)
Background: #ffffff (white)
Texto: #111827 (gray-900)
Texto Secundário: #6b7280 (gray-500)
Sucesso: #16a34a (green-600)
```

## 📁 Estrutura

```
quiz-dieta/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx (splash screen)
│   └── quiz/[step]/page.tsx
│
├── components/
│   ├── Button.tsx
│   ├── ProgressBar.tsx
│   ├── QuizLayout.tsx
│   └── steps/ (11 componentes de etapas)
│
└── store/
    └── quizStore.ts (Zustand)
```

## 🔧 Customização

### Mudar cores
Edite `tailwind.config.js` ou use classes diretas.

### Adicionar etapas
1. Crie novo componente em `components/steps/`
2. Adicione ao array `steps` em `app/quiz/[step]/page.tsx`
3. Atualize `totalSteps` em `store/quizStore.ts`
4. Adicione tipo no `QuizAnswers` interface

### Cálculos personalizados
Modifique a função `calculatePlan()` em `FinalStep.tsx`

## 🚀 Próximos Passos

- [ ] Integração com API backend
- [ ] Salvamento de progresso
- [ ] Animações entre transições
- [ ] Modo escuro
- [ ] Exportar PDF do plano
- [ ] Dashboard de acompanhamento

## 📄 Licença

Propriedade de Dieta Calculada © 2024

---

**Desenvolvido com 💙 para proporcionar a melhor experiência de onboarding**


Teste
