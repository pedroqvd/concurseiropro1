# ✅ Checklist de Testes - Concurseiro Pro

## 🧪 Roteiro Completo de Testes

### 📊 1. Dashboard (Tela Inicial)

**Caminho:** `/`

- [ ] O título "Concurseiro Pro" aparece no header azul
- [ ] O subtítulo "Seu motor de aprovação" está visível
- [ ] Ícone de usuário aparece no canto superior direito
- [ ] Card "Total de Cards" mostra o número correto (deve iniciar com 3)
- [ ] Card "Pendentes Hoje" mostra o número correto (deve iniciar com 3)
- [ ] Botão laranja "Começar Revisão do Dia" está visível e acessível
- [ ] Box informativo com dica sobre repetição espaçada aparece
- [ ] Navegação inferior com 3 botões (Home, Revisar, Gerenciar) está presente
- [ ] Botão "Home" está destacado (cor azul)

**Ações:**
- [ ] Clicar no botão "Começar Revisão" leva para `/review`
- [ ] Clicar em "Revisar" na navegação leva para `/review`
- [ ] Clicar em "Gerenciar" na navegação leva para `/manage`

---

### 📚 2. Tela de Revisão

**Caminho:** `/review`

#### 2.1 Estado com Cards Pendentes

- [ ] Botão "Voltar" aparece no canto superior esquerdo
- [ ] Contador "X / Y" mostra a posição atual e total de cards
- [ ] Badge com nome da disciplina está visível (ex: "Direito Administrativo")
- [ ] Card branco centralizado exibe a pergunta
- [ ] Label "Pergunta" aparece acima do texto
- [ ] Botão "Revelar Resposta" está visível e acessível

**Ação: Revelar Resposta**
- [ ] Clicar em "Revelar Resposta" executa animação suave
- [ ] Pergunta permanece visível (em texto menor)
- [ ] Separador visual (linha) entre pergunta e resposta
- [ ] Label "Resposta" em laranja aparece
- [ ] Resposta completa é exibida em texto maior
- [ ] Botão "Revelar Resposta" desaparece

**Botões de Feedback:**
- [ ] 3 botões aparecem: 🔴 Errei, 🟡 Bom, 🟢 Fácil
- [ ] Cada botão mostra o intervalo (amanhã, 3 dias, 7 dias)
- [ ] Texto "Como você avalia seu conhecimento?" aparece acima

**Ação: Feedback "Errei"**
- [ ] Clicar em "🔴 Errei" avança para próximo card
- [ ] Card some e próximo aparece suavemente
- [ ] Contador aumenta (ex: 1/3 → 2/3)
- [ ] Frente do novo card é exibida (não o verso)

**Ação: Feedback "Bom"**
- [ ] Clicar em "🟡 Bom" avança para próximo card
- [ ] Agendamento é salvo (verificar depois em Gerenciar)

**Ação: Feedback "Fácil"**
- [ ] Clicar em "🟢 Fácil" avança para próximo card
- [ ] Agendamento é salvo (verificar depois em Gerenciar)

**Última Card:**
- [ ] Ao responder o último card, retorna automaticamente para Dashboard

#### 2.2 Estado sem Cards Pendentes

- [ ] Emoji de celebração (🎉) aparece
- [ ] Mensagem "Parabéns!" é exibida
- [ ] Texto "Você não tem cards pendentes..." aparece
- [ ] Botão "Gerenciar Cards" está presente
- [ ] Clicar no botão leva para `/manage`

---

### 🗂️ 3. Tela de Gerenciamento

**Caminho:** `/manage`

#### 3.1 Com Cards

- [ ] Título "Meus Flashcards" aparece
- [ ] Contador "X cards cadastrados" mostra número correto
- [ ] Lista de cards é exibida (deve ter 3 inicialmente)

**Para Cada Card na Lista:**
- [ ] Tag azul com nome da disciplina
- [ ] Tag colorida com nível (Novo=azul, Errei=vermelho, Bom=amarelo, Fácil=verde)
- [ ] Texto da pergunta (preview com 2 linhas máximo)
- [ ] Ícone de calendário + data formatada (ex: "Hoje", "Em 3 dias")
- [ ] Botão de lápis (✏️) para editar
- [ ] Botão de lixeira (🗑️) para excluir
- [ ] Hover nos cards mostra sombra mais forte

**Botão FAB (Floating Action Button):**
- [ ] Botão laranja circular com "+" aparece no canto inferior direito
- [ ] Está posicionado acima da navegação inferior
- [ ] Hover aumenta ligeiramente o tamanho
- [ ] Clicar leva para `/card/new`

#### 3.2 Sem Cards (Estado Vazio)

- [ ] Emoji de livros (📚) aparece
- [ ] Mensagem "Nenhum card ainda" é exibida
- [ ] Texto "Comece criando seu primeiro flashcard!" aparece
- [ ] Botão FAB (+) continua disponível

---

### ✏️ 4. Formulário - Novo Card

**Caminho:** `/card/new`

- [ ] Botão voltar (seta) aparece no canto superior esquerdo
- [ ] Título "Novo Flashcard" está visível
- [ ] 3 campos de formulário aparecem:
  - [ ] Disciplina (input de texto)
  - [ ] Pergunta (textarea, 4 linhas)
  - [ ] Resposta (textarea, 5 linhas)
- [ ] Todos os campos têm asterisco vermelho (*) indicando obrigatoriedade
- [ ] Labels estão claras e bem posicionadas
- [ ] Placeholders aparecem nos campos
- [ ] Box informativo azul com dica está visível
- [ ] 2 botões no rodapé: "Cancelar" (cinza) e "Salvar Flashcard" (azul)

**Validação - Campos Vazios:**
- [ ] Clicar em "Salvar" sem preencher mostra erro em todos os campos
- [ ] Mensagens de erro em vermelho aparecem abaixo de cada campo
- [ ] Bordas dos campos ficam vermelhas
- [ ] Foco é mantido na página (não navega)

**Validação - Campos Parciais:**
- [ ] Preencher apenas disciplina e tentar salvar: erros em pergunta e resposta
- [ ] Preencher disciplina e pergunta: erro apenas em resposta

**Salvar com Sucesso:**
- [ ] Preencher todos os campos com dados válidos
- [ ] Clicar em "Salvar Flashcard"
- [ ] Redireciona para `/manage`
- [ ] Novo card aparece na lista
- [ ] Card criado tem status "Novo"
- [ ] Próxima revisão é "Hoje"

**Cancelar:**
- [ ] Clicar em "Cancelar" retorna para `/manage`
- [ ] Dados não são salvos
- [ ] Lista em `/manage` permanece inalterada

---

### ✏️ 5. Formulário - Editar Card

**Caminho:** `/card/edit/:id`

**Acesso:**
- [ ] Na tela Gerenciar, clicar no lápis de um card existente
- [ ] URL muda para `/card/edit/[número]`

**Pré-preenchimento:**
- [ ] Título muda para "Editar Flashcard"
- [ ] Campo Disciplina vem preenchido com valor atual
- [ ] Campo Pergunta vem preenchido com valor atual
- [ ] Campo Resposta vem preenchido com valor atual
- [ ] Botão muda para "Salvar Alterações"

**Editar e Salvar:**
- [ ] Modificar qualquer campo
- [ ] Clicar em "Salvar Alterações"
- [ ] Redireciona para `/manage`
- [ ] Card atualizado aparece na lista com novos dados
- [ ] Mantém o mesmo ID, status e datas

**Validação:**
- [ ] Apagar um campo obrigatório e tentar salvar mostra erro
- [ ] Mesmas regras de validação do formulário de criação

---

### 🗑️ 6. Modal de Exclusão

**Acesso:**
- [ ] Na tela Gerenciar, clicar no ícone de lixeira de qualquer card

**Aparência do Modal:**
- [ ] Overlay escuro (50% preto) cobre a tela
- [ ] Modal branco centralizado aparece com animação
- [ ] Título "Confirmar Exclusão" em negrito
- [ ] Botão X no canto superior direito
- [ ] Texto explicativo sobre ação irreversível
- [ ] Box cinza mostrando preview do card a ser excluído:
  - [ ] Disciplina em texto pequeno
  - [ ] Pergunta em preview (2 linhas max)
- [ ] 2 botões: "Cancelar" (cinza) e "Excluir" (vermelho)
- [ ] Botão "Excluir" tem ícone de lixeira

**Ação: Cancelar**
- [ ] Clicar em "Cancelar" fecha o modal
- [ ] Clicar no X fecha o modal
- [ ] Clicar fora do modal fecha o modal
- [ ] Card NÃO é excluído
- [ ] Retorna para lista de gerenciamento

**Ação: Excluir**
- [ ] Clicar em "Excluir" fecha o modal
- [ ] Card desaparece da lista imediatamente
- [ ] Contador de cards diminui
- [ ] Métricas no Dashboard são atualizadas

---

### 🔄 7. Algoritmo de Repetição Espaçada

**Teste Completo do Algoritmo:**

#### Preparação:
1. [ ] Anotar data de hoje
2. [ ] Ir para Gerenciar e verificar data de próxima revisão de um card

#### Teste 1: Feedback "Errei"
1. [ ] Ir para Revisão
2. [ ] Marcar um card como "🔴 Errei"
3. [ ] Voltar para Gerenciar
4. [ ] Verificar que próxima revisão = AMANHÃ (hoje + 1 dia)
5. [ ] Verificar que status mudou para "Errei"

#### Teste 2: Feedback "Bom"
1. [ ] Ir para Revisão
2. [ ] Marcar um card como "🟡 Bom"
3. [ ] Voltar para Gerenciar
4. [ ] Verificar que próxima revisão = DAQUI A 3 DIAS (hoje + 3 dias)
5. [ ] Verificar que status mudou para "Bom"

#### Teste 3: Feedback "Fácil"
1. [ ] Ir para Revisão
2. [ ] Marcar um card como "🟢 Fácil"
3. [ ] Voltar para Gerenciar
4. [ ] Verificar que próxima revisão = DAQUI A 7 DIAS (hoje + 7 dias)
5. [ ] Verificar que status mudou para "Fácil"

#### Teste 4: Cards Pendentes (Simulação)
1. [ ] Editar manualmente no DevTools localStorage um card para ter próxima_revisao de ontem
2. [ ] Recarregar página
3. [ ] Dashboard deve mostrar +1 pendente
4. [ ] Ir para Revisão deve mostrar esse card

---

### 🎨 8. Identidade Visual

**Cores:**
- [ ] Header usa gradiente azul escuro (#1A237E) para azul médio (#3F51B5)
- [ ] Botão principal usa laranja (#FF6F00)
- [ ] Navegação ativa usa azul médio (#3F51B5)
- [ ] Fundos usam cinza claro (#F5F5F5)
- [ ] Cards usam branco (#FFFFFF)

**Tipografia:**
- [ ] Textos são legíveis e bem espaçados
- [ ] Hierarquia clara (títulos maiores que corpo)
- [ ] Labels em maiúsculas nos cards de revisão

**Espaçamento:**
- [ ] Cards têm bordas arredondadas (8px ou mais)
- [ ] Botões têm altura mínima de 44px
- [ ] Espaçamento consistente entre elementos
- [ ] Padding adequado em cards e containers

---

### 📱 9. Navegação

**Navegação Inferior:**
- [ ] Sempre visível em todas as telas (exceto formulários)
- [ ] 3 ícones + labels: Home, Revisar, Gerenciar
- [ ] Item ativo destacado em azul
- [ ] Itens inativos em cinza
- [ ] Transição suave ao mudar de tela

**Rotas:**
- [ ] `/` → Dashboard
- [ ] `/review` → Revisão
- [ ] `/manage` → Gerenciamento
- [ ] `/card/new` → Novo card
- [ ] `/card/edit/:id` → Editar card (id numérico)

**Botões Voltar:**
- [ ] Todas as telas secundárias têm botão "Voltar"
- [ ] Seta para esquerda + texto "Voltar"
- [ ] Cor azul consistente

---

### 💾 10. Persistência de Dados

**localStorage:**
- [ ] Abrir DevTools → Application → Local Storage
- [ ] Chave `concurseiro_pro_flashcards` existe
- [ ] Valor é um array JSON de objetos
- [ ] Cada objeto tem: id, disciplina, pergunta, resposta, nivel, proxima_revisao, data_cadastro

**Persistência entre Sessões:**
1. [ ] Criar 2 novos cards
2. [ ] Fechar o navegador completamente
3. [ ] Abrir novamente
4. [ ] Verificar que os 5 cards (3 originais + 2 novos) ainda existem

**Sincronização em Tempo Real:**
- [ ] Criar um card → aparece imediatamente no Dashboard
- [ ] Excluir um card → contador no Dashboard atualiza
- [ ] Marcar card como revisado → desaparece de "Pendentes Hoje"

---

### ♿ 11. Acessibilidade

**Botões:**
- [ ] Todos os botões têm altura mínima de 44px (recomendação mobile)
- [ ] Ícones de ação (editar, excluir) têm `aria-label`
- [ ] Botões mudam de cor no hover
- [ ] Feedback visual ao clicar (scale down)

**Formulários:**
- [ ] Labels associados aos inputs
- [ ] Mensagens de erro descritivas
- [ ] Campos obrigatórios marcados com *
- [ ] Placeholders informativos

**Navegação:**
- [ ] Links e botões têm estados de hover visíveis
- [ ] Área de toque adequada (não muito pequena)

---

### 📊 12. Dados de Exemplo

**Verificar 3 Cards Iniciais:**

**Card 1:**
- [ ] Disciplina: "Direito Administrativo"
- [ ] Pergunta: "Quais são os princípios da Administração Pública..."
- [ ] Resposta: "LIMPE: Legalidade, Impessoalidade..."
- [ ] Nível: "Novo"
- [ ] Próxima revisão: Hoje

**Card 2:**
- [ ] Disciplina: "AFO (Administração Financeira e Orçamentária)"
- [ ] Pergunta: "O que é o princípio da anualidade orçamentária?"
- [ ] Resposta: "Determina que o orçamento deve ser autorizado..."
- [ ] Nível: "Novo"
- [ ] Próxima revisão: Hoje

**Card 3:**
- [ ] Disciplina: "Português"
- [ ] Pergunta: 'Qual a diferença entre "há" e "a" indicando tempo?'
- [ ] Resposta: '"Há" indica tempo passado...'
- [ ] Nível: "Novo"
- [ ] Próxima revisão: Hoje

---

### 🚀 13. Performance e UX

**Animações:**
- [ ] Flip do card ao revelar resposta é suave
- [ ] Transição entre cards na revisão é fluida
- [ ] Modal aparece com fade in
- [ ] Botões têm animação de scale no hover/click
- [ ] FAB tem animação de scale no hover

**Responsividade:**
- [ ] Layout funciona em mobile (320px+)
- [ ] Layout funciona em tablet (768px+)
- [ ] Layout funciona em desktop (1024px+)
- [ ] Max-width de conteúdo mantém legibilidade

**Loading/Estados:**
- [ ] Não há delays perceptíveis
- [ ] Transições são instantâneas (dados em memória)
- [ ] Feedback imediato em todas as ações

---

## 🎯 Cenários de Uso Completos

### Cenário 1: Primeiro Uso (Novo Usuário)
1. [ ] Abrir app pela primeira vez
2. [ ] Ver 3 cards de exemplo no Dashboard
3. [ ] Fazer primeira revisão completa
4. [ ] Criar primeiro card próprio
5. [ ] Verificar que tudo foi salvo

### Cenário 2: Rotina Diária de Estudo
1. [ ] Abrir app
2. [ ] Ver quantos cards pendentes
3. [ ] Fazer todas as revisões do dia
4. [ ] Ver mensagem de conclusão
5. [ ] Adicionar novos conteúdos estudados

### Cenário 3: Gerenciamento de Conteúdo
1. [ ] Ver lista completa de cards
2. [ ] Editar um card com erro de digitação
3. [ ] Excluir card que não é mais relevante
4. [ ] Verificar datas de próximas revisões
5. [ ] Planejar estudo baseado nas datas

### Cenário 4: Correção de Erros
1. [ ] Criar card com informação errada
2. [ ] Perceber o erro durante revisão
3. [ ] Voltar para Gerenciar
4. [ ] Editar e corrigir informação
5. [ ] Continuar estudando

---

## 📋 Checklist Final de Entrega

### Funcionalidades Core (100% Obrigatório)
- [ ] CRUD completo funciona (Create, Read, Update, Delete)
- [ ] Algoritmo de repetição espaçada funciona (1, 3, 7 dias)
- [ ] Modal de confirmação de exclusão funciona
- [ ] Navegação entre todas as 4 telas funciona
- [ ] Dados persistem no localStorage
- [ ] Validação de formulários funciona
- [ ] Identidade visual aplicada (cores corretas)

### Design (100% Obrigatório)
- [ ] 4 telas implementadas conforme escopo
- [ ] Navegação inferior com 3 botões
- [ ] Botões grandes (44px+) para mobile
- [ ] Cards com bordas arredondadas
- [ ] Cores do escopo aplicadas

### UX (Altamente Recomendado)
- [ ] Animações suaves e profissionais
- [ ] Feedback visual em todas as ações
- [ ] Estados vazios bem tratados
- [ ] Mensagens de erro claras
- [ ] Loading states (se aplicável)

### Documentação (Para Apresentação)
- [ ] README/Documentação técnica
- [ ] Guia de uso rápido
- [ ] Screenshots das 4 telas + modal
- [ ] Explicação do algoritmo
- [ ] Conceitos acadêmicos aplicados

---

## ✅ Aprovado para Entrega?

Marque SIM apenas se:
- [ ] Todos os itens de "Funcionalidades Core" estão ✅
- [ ] Todos os itens de "Design" estão ✅
- [ ] Pelo menos 80% dos testes deste checklist passaram
- [ ] App funciona sem erros no console
- [ ] Dados persistem corretamente

---

**Se todos os checkboxes acima estão marcados: 🎉 PROJETO PRONTO PARA ENTREGA!**
