# 📊 Configuração do Google Sheets API

Este guia explica como configurar a integração com Google Sheets para salvar automaticamente os dados do quiz.

## 📋 Pré-requisitos

1. Conta Google (Gmail)
2. Acesso ao [Google Cloud Console](https://console.cloud.google.com/)

## 🚀 Passo a Passo

### 1. Criar um Projeto no Google Cloud

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em "Selecionar projeto" → "Novo Projeto"
3. Dê um nome ao projeto (ex: "Quiz Dieta Calculada")
4. Clique em "Criar"

### 2. Habilitar Google Sheets API

1. No menu lateral, vá em **APIs e Serviços** → **Biblioteca**
2. Procure por "Google Sheets API"
3. Clique em "Ativar"

### 3. Criar Service Account

1. Vá em **APIs e Serviços** → **Credenciais**
2. Clique em **+ Criar Credenciais** → **Conta de serviço**
3. Preencha:
   - **Nome**: `quiz-sheets-service`
   - **ID**: será gerado automaticamente
   - **Descrição**: `Service account para integração com Google Sheets`
4. Clique em **Criar e continuar**
5. Pule a etapa de "Conceder acesso" (opcional)
6. Clique em **Concluído**

### 4. Gerar Chave JSON

1. Na lista de contas de serviço, clique na que você acabou de criar
2. Vá na aba **Chaves**
3. Clique em **Adicionar chave** → **Criar nova chave**
4. Selecione **JSON**
5. Clique em **Criar**
6. Um arquivo JSON será baixado - **GUARDE ESTE ARQUIVO COM SEGURANÇA!**

### 5. Extrair Credenciais do JSON

Abra o arquivo JSON baixado e copie:

- **`client_email`**: Email da service account
- **`private_key`**: Chave privada (mantenha as quebras de linha `\n`)

### 6. Criar Planilha no Google Sheets

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Na primeira linha, adicione os cabeçalhos:

```
Data/Hora | Nome | Email | Telefone | Gênero | Data Nascimento | Altura (cm) | Altura (in) | Peso (kg) | Peso Desejado | Objetivo | Velocidade Semanal | Tipo Dieta | Treinos/Semana | Tem Personal | Conquistas | Obstáculos | Onde Ouviu | Já Usou Apps | Código Referência | Adicionar Calorias | Transferir Calorias | Unidade
```

4. Copie o **ID da planilha** da URL:
   - URL exemplo: `https://docs.google.com/spreadsheets/d/ABC123XYZ/edit`
   - ID: `ABC123XYZ`

### 7. Compartilhar Planilha com Service Account

1. Na planilha, clique em **Compartilhar** (canto superior direito)
2. Cole o **email da service account** (o `client_email` do JSON)
3. Dê permissão de **Editor**
4. Clique em **Enviar** (sem notificar)

### 8. Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edite `.env.local` e preencha:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=seu-service-account@projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=ABC123XYZ
```

**⚠️ IMPORTANTE:**
- Mantenha as aspas duplas no `GOOGLE_PRIVATE_KEY`
- Mantenha as quebras de linha `\n` na chave privada
- Nunca commite o arquivo `.env.local` no Git!

### 9. Testar a Integração

1. Execute o projeto:
   ```bash
   npm run dev
   ```

2. Complete o quiz até a página final (ThankYouStep)

3. Verifique a planilha - os dados devem aparecer automaticamente!

## 🔒 Segurança

- ✅ O arquivo `.env.local` já está no `.gitignore`
- ✅ Nunca compartilhe suas credenciais
- ✅ Use variáveis de ambiente no Vercel/Netlify para produção

## 🐛 Troubleshooting

### Erro: "The caller does not have permission"
- Verifique se compartilhou a planilha com o email da service account
- Confirme que deu permissão de **Editor**

### Erro: "Invalid credentials"
- Verifique se copiou corretamente o `GOOGLE_PRIVATE_KEY`
- Certifique-se de manter as quebras de linha `\n`
- Verifique se o email está correto

### Erro: "Spreadsheet not found"
- Verifique se o `GOOGLE_SHEET_ID` está correto
- Confirme que a planilha existe e está acessível

## 📝 Estrutura dos Dados

Os dados são salvos na seguinte ordem:

1. Data/Hora (timestamp)
2. Nome
3. Email
4. Telefone
5. Gênero
6. Data de Nascimento
7. Altura (cm)
8. Altura (polegadas, se imperial)
9. Peso (kg ou lb)
10. Peso Desejado
11. Objetivo (perder/manter/ganhar)
12. Velocidade Semanal (kg/semana)
13. Tipo de Dieta
14. Treinos por Semana
15. Tem Personal Trainer
16. Conquistas (separadas por vírgula)
17. Obstáculos (separados por vírgula)
18. Onde Ouviu Falar
19. Já Usou Outros Apps
20. Código de Referência
21. Adicionar Calorias Queimadas
22. Transferir Calorias Extras
23. Unidade (metric/imperial)

## 🚀 Deploy em Produção

### Vercel

1. Vá em **Settings** → **Environment Variables**
2. Adicione as três variáveis:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
3. Faça o deploy novamente

### Netlify

1. Vá em **Site settings** → **Environment variables**
2. Adicione as mesmas variáveis
3. Faça o deploy novamente

---

**Pronto!** Agora todos os dados do quiz serão salvos automaticamente no Google Sheets! 🎉

