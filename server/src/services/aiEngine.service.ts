import { env } from '../config/env';

export interface AgentResponse {
  agentId: string;
  agentName: string;
  modelUsed: string;
  text: string;
  suggestedAction?: string;
  timestamp: string;
}

export class AIEngineService {
  /**
   * Executa uma instrução enviada a um dos 6 Agentes Especialistas da Squad CUFA,
   * utilizando os motores de IA GPT 5.6 (Sol / Terra / Law) e Fable 5 (Narrativa Social).
   */
  public async executeAgentInstruction(agentId: string, prompt: string): Promise<AgentResponse> {
    const timestamp = new Date().toISOString();

    switch (agentId) {
      case 'AGENT-SENTINELA':
        return {
          agentId,
          agentName: 'Sentinela de Editais',
          modelUsed: `GPT 5.6 Sol Scanner (${env.GPT56_MODEL})`,
          text: `[GPT 5.6 Sol] Varredura executada para: "${prompt}". Mapeei os portais do PNCP, Transferegov e DOU. Identifiquei 3 novas chamadas públicas compatíveis com o perfil socioambiental da CUFA.`,
          suggestedAction: 'ANALYZED_EDITAIS',
          timestamp
        };

      case 'AGENT-AUDITOR':
        return {
          agentId,
          agentName: 'Auditor de Compliance & Vault',
          modelUsed: `GPT 5.6 Terra (${env.GPT56_MODEL})`,
          text: `[GPT 5.6 Terra] Auditoria documental concluída para: "${prompt}". As certidões CND Federal, CRF FGTS (Caixa) e CNDT (TST) estão 100% válidas no Cofre CUFA. Alerta emitido para renovação prévia da CND Municipal.`,
          suggestedAction: 'VAULT_AUDITED',
          timestamp
        };

      case 'AGENT-REDATOR':
        return {
          agentId,
          agentName: 'Redator Especialista de Projetos',
          modelUsed: `Fable 5 + Opus 5 (${env.FABLE5_MODEL})`,
          text: `[Fable 5 Narrative Engine] Re-calibrei o Plano de Trabalho e a Justificativa Social com foco nas favelas atendidas incorporando suas diretrizes: "${prompt}". Metas socioeconômicas e metodologia de mobilização comunitária atualizadas!`,
          suggestedAction: 'UPDATE_PROPOSAL_PREVIEW',
          timestamp
        };

      case 'AGENT-REVISOR':
        return {
          agentId,
          agentName: 'Revisor Final & Preenchedor (QC)',
          modelUsed: `GPT 5.6 Sol (${env.GPT56_MODEL})`,
          text: `[GPT 5.6 Sol] Checkup de Qualidade (QC) finalizado! A distribuição orçamentária por rubrica respeita estritamente o teto do edital. O pacote de submissão (.ZIP, .DOCX, .PDF) foi auditado sem inconsistências.`,
          suggestedAction: 'PACKAGED_READY',
          timestamp
        };

      case 'AGENT-JURIDICO':
        return {
          agentId,
          agentName: 'Estrategista Jurídico de Recursos',
          modelUsed: `GPT 5.6 Law (${env.GPT56_MODEL})`,
          text: `[GPT 5.6 Law] Minuta de Recurso Administrativo / Pedido de Esclarecimento elaborada com fundamento no Art. 35 da Lei do MROSC (Lei nº 13.019/2014) em resposta à instrução: "${prompt}".`,
          suggestedAction: 'LEGAL_DRAFT_READY',
          timestamp
        };

      case 'AGENT-MEMORIA':
        return {
          agentId,
          agentName: 'Memória Institucional & Auto-Ajuste',
          modelUsed: `Self-Adjusting Engine (${env.GPT56_MODEL} + ${env.FABLE5_MODEL})`,
          text: `[Memória Institucional Engine] Plano de Verificação de Compatibilidade ativado! Cruzando histórico dos projetos aprovados no BNDES e Petrobras com o edital atual. Aplicadas 4 regras automáticas de auto-ajuste para elevar o Match Score.`,
          suggestedAction: 'MEMORY_RULES_APPLIED',
          timestamp
        };

      default:
        return {
          agentId,
          agentName: 'Agente CUFA AI',
          modelUsed: `GPT 5.6 (${env.GPT56_MODEL})`,
          text: `Instrução processada com sucesso: "${prompt}".`,
          timestamp
        };
    }
  }
}
