import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validação básica
    if (!body || typeof body !== 'object') {
      console.error('❌ Dados inválidos recebidos');
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      );
    }

    // Verificar variáveis de ambiente
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    console.log('🔍 Verificando variáveis de ambiente...');
    console.log('Email configurado:', serviceAccountEmail ? '✅ Sim' : '❌ Não');
    console.log('Private Key configurada:', privateKey ? '✅ Sim' : '❌ Não');
    console.log('Sheet ID configurado:', spreadsheetId ? '✅ Sim' : '❌ Não');

    if (!serviceAccountEmail || !privateKey || !spreadsheetId) {
      console.error('❌ Variáveis de ambiente não configuradas corretamente');
      return NextResponse.json(
        { 
          error: 'Configuração incompleta',
          details: {
            hasEmail: !!serviceAccountEmail,
            hasKey: !!privateKey,
            hasSheetId: !!spreadsheetId,
          }
        },
        { status: 500 }
      );
    }

    // Configuração do Google Sheets
    console.log('🔐 Configurando autenticação Google...');
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    console.log('✅ Autenticação configurada');

    // Preparar dados para inserção
    const timestamp = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });

    // Formatar arrays como strings
    const achievements = Array.isArray(body.achievements) 
      ? body.achievements.join(', ') 
      : body.achievements || '';
    
    const obstacles = Array.isArray(body.obstacles) 
      ? body.obstacles.join(', ') 
      : body.obstacles || '';

    // Formatar data de nascimento
    const birthDate = body.birthDate 
      ? new Date(body.birthDate).toLocaleDateString('pt-BR')
      : '';

    // Linha de dados para inserir
    const values = [[
      timestamp,                                    // Data/Hora
      body.name || '',                              // Nome
      body.email || '',                             // Email
      body.phone || '',                             // Telefone
      body.gender || '',                            // Gênero
      birthDate,                                    // Data de Nascimento
      body.heightCm || body.heightFt || '',         // Altura (cm ou ft)
      body.heightIn || '',                          // Altura (polegadas, se imperial)
      body.weightKg || body.weightLb || '',         // Peso (kg ou lb)
      body.desiredWeightKg || '',                   // Peso Desejado
      body.goal || '',                              // Objetivo (perder/manter/ganhar)
      body.weightSpeedPerWeek || '',                // Velocidade de perda/ganho por semana
      body.dietType || '',                          // Tipo de dieta
      body.workoutsPerWeek || '',                   // Treinos por semana
      body.hasTrainer ? 'Sim' : 'Não',             // Tem personal trainer
      achievements,                                  // Conquistas
      obstacles,                                     // Obstáculos
      body.heardFrom || '',                         // Onde ouviu falar
      body.triedOtherApps ? 'Sim' : 'Não',          // Já usou outros apps
      body.referralCode || '',                      // Código de referência
      body.addBurnedCalories ? 'Sim' : 'Não',      // Adicionar calorias queimadas
      body.transferExtraCalories ? 'Sim' : 'Não',  // Transferir calorias extras
      body.unit || 'metric',                        // Unidade (métrica/imperial)
    ]];

    // Inserir dados na planilha
    console.log('📊 Enviando dados para a planilha...');
    console.log('Sheet ID:', spreadsheetId);
    console.log('Dados a enviar:', JSON.stringify(values[0], null, 2));
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A:W', // Usa a primeira aba, independente do nome
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    });

    console.log('✅ Dados enviados com sucesso!');
    console.log('Resposta:', response.data);

    return NextResponse.json(
      { success: true, message: 'Dados enviados com sucesso!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Erro ao enviar dados para Google Sheets:');
    console.error('Tipo do erro:', error.constructor.name);
    console.error('Mensagem:', error.message);
    console.error('Stack:', error.stack);
    
    // Mensagens de erro mais específicas
    let errorMessage = 'Erro ao enviar dados';
    if (error.message?.includes('PERMISSION_DENIED')) {
      errorMessage = 'Permissão negada. Verifique se a planilha foi compartilhada com a service account.';
    } else if (error.message?.includes('NOT_FOUND')) {
      errorMessage = 'Planilha não encontrada. Verifique o ID da planilha.';
    } else if (error.message?.includes('UNAUTHENTICATED')) {
      errorMessage = 'Erro de autenticação. Verifique as credenciais.';
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          code: error.code,
        } : undefined 
      },
      { status: 500 }
    );
  }
}

