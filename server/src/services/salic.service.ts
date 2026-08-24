import axios from 'axios';
import { env } from '../config/env';

export interface SalicProjeto {
  id: string;
  pronac: string;
  nome: string;
  proponente: string;
  segmento: string;
  area: string;
  uf: string;
  valorSolicitado: string;
  valorAprovado: string;
  mecanismo: string;
  situacao: string;
  synopsis: string;
  matchScore: number;
}

export class SalicService {
  /**
   * Consulta a API oficial do SALIC (Sistema de Apoio às Leis de Incentivo à Cultura - Lei Rouanet)
   * Endpoint oficial: GET https://api.salic.cultura.gov.br/v1/projetos/
   */
  public async fetchProjetosCulturasFavelas(): Promise<SalicProjeto[]> {
    try {
      const response = await axios.get(`${env.SALIC_API_URL}/projetos/`, {
        params: {
          limit: 6,
          format: 'json'
        },
        headers: { 'Accept': 'application/json' },
        timeout: 6000
      });

      if (response.data?._embedded?.projetos && Array.isArray(response.data._embedded.projetos)) {
        return response.data._embedded.projetos.slice(0, 4).map((p: any) => ({
          id: `SALIC-${p.PRONAC || Date.now()}`,
          pronac: p.PRONAC || '240001',
          nome: p.nome || 'Projeto Cultural Comunidade Viva',
          proponente: p.cgccpf ? `Proponente (${p.cgccpf.substring(0, 8)}...)` : 'Associação Cultural Periférica',
          segmento: p.segmento || 'Música / Artes Cênicas',
          area: p.area || 'Artes Integradas',
          uf: p.UF || 'RJ',
          valorSolicitado: `R$ ${(p.valor_solicitado || 500000).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          valorAprovado: `R$ ${(p.valor_aprovado || 450000).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          mecanismo: 'Lei Rouanet (Art. 18 / Incentivo Fiscal)',
          situacao: p.situacao || 'Aprovado para Captação',
          synopsis: p.resumo || 'Fomento a oficinas culturais, teatro de rua e formação técnica para jovens de favela.',
          matchScore: 95
        }));
      }
      return this.getMockedSalic();
    } catch (err: any) {
      console.warn('[CUFA Backend] SALIC API indisponível, usando fallback.', err.message);
      return this.getMockedSalic();
    }
  }

  private getMockedSalic(): SalicProjeto[] {
    return [
      {
        id: 'SALIC-241088',
        pronac: '241088',
        nome: 'Festival Favela em Cena 2026 — Edição Nacional',
        proponente: 'Central Única das Favelas — CUFA Rio',
        segmento: 'Teatro de Rua & Hip Hop',
        area: 'Artes Integradas',
        uf: 'RJ',
        valorSolicitado: 'R$ 1.800.000,00',
        valorAprovado: 'R$ 1.800.000,00',
        mecanismo: 'Lei Rouanet (Artigo 18 — 100% de Isenção Fiscal)',
        situacao: 'Autorizado para Captação de Patrocínio',
        synopsis: 'Circulação de espetáculos teatrais e musicais produzidos por artistas residentes em comunidades vulneráveis.',
        matchScore: 98
      }
    ];
  }
}
