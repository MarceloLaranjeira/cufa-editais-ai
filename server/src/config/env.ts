import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const env = {
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
  
  // AI Models specified by the user: GPT 5.6 and Fable 5
  GPT56_MODEL: process.env.GPT56_MODEL || 'gpt-5.6-sol-terra',
  FABLE5_MODEL: process.env.FABLE5_MODEL || 'fable-5-social',
  
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',

  // Government APIs
  PNCP_API_URL: process.env.PNCP_API_URL || 'https://pncp.gov.br/api/consulta/v1',
  TRANSFEREGOV_API_URL: process.env.TRANSFEREGOV_API_URL || 'http://api-publica.transferegov.gestao.gov.br',
  SALIC_API_URL: process.env.SALIC_API_URL || 'https://api.salic.cultura.gov.br/v1',
  DOU_API_URL: process.env.DOU_API_URL || 'https://www.in.gov.br/servicos/buscar-no-diario-oficial'
};
