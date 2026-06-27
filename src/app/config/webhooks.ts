// =====================================================================
// CONFIGURE SEUS WEBHOOKS DO MAKE/INTEGROMAT AQUI
// Após criar cada cenário no Make, cole a URL do webhook abaixo.
// Enquanto uma URL estiver vazia, o app usa localStorage como fallback.
// =====================================================================

export const WEBHOOKS = {
  // Cenário 1 — CRUD-Create-Card
  // Recebe: { disciplina, pergunta, resposta }
  // Retorna: { id, disciplina, pergunta, resposta, nivel, proxima_revisao, data_cadastro }
  CREATE: 'https://hook.us2.make.com/qg2bojdxtnbr50vl4t7k7me31l3oe3av',

  // Cenário 2 — CRUD-Multi (READ, UPDATE e DELETE via Router)
  // Recebe: { action, ...params }
  // - action: "read" → retorna array de cards
  // - action: "update" → recebe { id, feedback?, disciplina?, pergunta?, resposta? }
  // - action: "delete" → recebe { id }
  MULTI: 'https://hook.us2.make.com/hi48uu6eyol54erwy6zqi2nbm9ji83fo',
};

export const isMakeConfigured = (): boolean => WEBHOOKS.MULTI.trim() !== '';