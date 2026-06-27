# 📚 Concurseiro Pro - Documentação do Projeto

## 🎯 Visão Geral

**Concurseiro Pro** é um aplicativo web de flashcards com repetição espaçada, desenvolvido para ajudar candidatos a concursos públicos a combater a curva de esquecimento através de revisões estratégicas.

### Informações do Projeto
- **Instituição:** UniCEUB
- **Curso:** Administração e Gestão Financeira
- **Atividade:** Sistematização - App Híbrido Low-Code
- **Data de Entrega:** 28 de junho de 2026

---

## 🎨 Identidade Visual

### Paleta de Cores
- **Azul Escuro:** `#1A237E` - Cor primária institucional
- **Azul Médio:** `#3F51B5` - Cor de destaque e navegação
- **Laranja:** `#FF6F00` - Botões de ação principal
- **Cinza Claro:** `#F5F5F5` - Fundos e áreas secundárias

### Características de Design
- Estilo minimalista e profissional
- Cards com bordas arredondadas (8px)
- Botões grandes (mínimo 44px de altura) para facilitar interação mobile
- Tipografia clara e legível

---

## 📱 Estrutura do Aplicativo

### Tela 1: Dashboard (Home)
**Rota:** `/`

**Funcionalidades:**
- Exibe métricas importantes:
  - Total de flashcards cadastrados
  - Cartões pendentes para revisar hoje
- Botão principal "Começar Revisão do Dia"
- Dica educacional sobre repetição espaçada
- Navegação inferior com 3 seções

**Tecnologia:** Utiliza `getAllFlashcards()` e `getFlashcardsForReview()` do sistema de storage

---

### Tela 2: Revisão de Flashcards
**Rota:** `/review`

**Funcionalidades:**
- Sistema de flashcards interativo com frente/verso
- Exibe cards pendentes para o dia
- **Frente do Card:** Mostra a pergunta
- **Botão "Revelar Resposta":** Transição suave para o verso
- **Verso do Card:** Mostra pergunta + resposta
- **Sistema de Feedback com 3 opções:**
  - 🔴 **Errei** → Agenda para amanhã (+1 dia)
  - 🟡 **Bom** → Agenda para daqui a 3 dias (+3 dias)
  - 🟢 **Fácil** → Agenda para daqui a 7 dias (+7 dias)

**Algoritmo de Repetição Espaçada:**
```javascript
// Implementado em storage.ts
if (feedback === 'Errei') daysToAdd = 1;
if (feedback === 'Bom') daysToAdd = 3;
if (feedback === 'Fácil') daysToAdd = 7;
```

**Tela de Conclusão:**
Quando não há cards pendentes, exibe mensagem de parabéns e incentivo

---

### Tela 3: Gerenciamento de Cards
**Rota:** `/manage`

**Funcionalidades:**
- Lista completa de todos os flashcards
- **Informações Exibidas por Card:**
  - Disciplina (tag colorida)
  - Status/Nível (Novo, Errei, Bom, Fácil)
  - Pergunta (preview com 2 linhas)
  - Data da próxima revisão formatada
- **Ações por Card:**
  - ✏️ Editar (navega para formulário de edição)
  - 🗑️ Excluir (abre modal de confirmação)
- **FAB (Floating Action Button):**
  - Botão flutuante laranja com ícone "+"
  - Cria novo flashcard

**Modal de Exclusão:**
- Título: "Confirmar Exclusão"
- Preview do card a ser excluído
- Botões: "Cancelar" e "Excluir"
- Impede exclusões acidentais

---

### Tela 4: Formulário de Card
**Rotas:** `/card/new` (criação) e `/card/edit/:id` (edição)

**Campos do Formulário:**
1. **Disciplina** (obrigatório)
   - Campo de texto simples
   - Exemplo: "Direito Administrativo", "AFO", "Português"

2. **Pergunta** (obrigatório)
   - Campo de texto multilinha (textarea)
   - Área para enunciado da questão ou conceito

3. **Resposta** (obrigatório)
   - Campo de texto multilinha (textarea)
   - Área para gabarito ou explicação detalhada

**Validação:**
- Todos os campos são obrigatórios
- Mensagens de erro claras em vermelho
- Validação em tempo real ao submeter

**Comportamento Automático:**
- Novos cards recebem automaticamente:
  - Status: "Novo"
  - Próxima revisão: Data atual (hoje)
  - Data de cadastro: Data atual
- ID gerado automaticamente (auto-incremento)

**Botões de Ação:**
- "Cancelar" → Retorna para /manage
- "Salvar Flashcard" / "Salvar Alterações" → Salva e retorna para /manage

---

## 🗄️ Estrutura de Dados

### Interface Flashcard
```typescript
interface Flashcard {
  id: number;                    // Identificador único
  disciplina: string;            // Nome da matéria
  pergunta: string;              // Enunciado/Conceito
  resposta: string;              // Gabarito/Explicação
  nivel: 'Novo' | 'Errei' | 'Bom' | 'Fácil';  // Última avaliação
  proxima_revisao: string;       // Data ISO (YYYY-MM-DD)
  data_cadastro: string;         // Data ISO (YYYY-MM-DD)
}
```

### Operações CRUD

#### CREATE - Criar Flashcard
```typescript
createFlashcard(data: {
  disciplina: string;
  pergunta: string;
  resposta: string;
}): Flashcard
```

#### READ - Ler Flashcards
```typescript
getAllFlashcards(): Flashcard[]           // Todos os cards
getFlashcardsForReview(): Flashcard[]     // Cards de hoje
getFlashcardById(id: number): Flashcard   // Card específico
```

#### UPDATE - Atualizar Flashcard
```typescript
updateFlashcard(id: number, data: Partial<Flashcard>): void
updateFlashcardFeedback(id: number, feedback: 'Errei' | 'Bom' | 'Fácil'): void
```

#### DELETE - Excluir Flashcard
```typescript
deleteFlashcard(id: number): void
```

---

## 💾 Armazenamento Local

O aplicativo utiliza **localStorage** do navegador para persistência de dados, simulando o comportamento de um backend real com Google Sheets + Make/Integromat.

**Vantagens:**
- ✅ Dados persistem mesmo após fechar o navegador
- ✅ Funciona offline
- ✅ Não requer configuração de servidor
- ✅ Perfeito para demonstração e protótipo

**Dados de Exemplo:**
O aplicativo vem pré-carregado com 3 flashcards de exemplo:
1. Direito Administrativo - Princípios LIMPE
2. AFO - Princípio da Anualidade
3. Português - Diferença entre "há" e "a"

---

## 🔄 Fluxo de Navegação

```
Dashboard (/)
    ├─→ Começar Revisão → Review (/review)
    │                         └─→ Feedback → Próximo Card ou Dashboard
    │
    ├─→ Revisar (nav) → Review (/review)
    │
    └─→ Gerenciar (nav) → Manage (/manage)
                              ├─→ + (FAB) → Novo Card (/card/new)
                              ├─→ ✏️ Editar → Edit Card (/card/edit/:id)
                              └─→ 🗑️ Excluir → Modal → Confirmação → Reload
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS v4** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones

### Roteamento
- **React Router 7** - Navegação SPA (Single Page Application)
- Modo Data Router com `createBrowserRouter`

### Build & Dev
- **Vite 6** - Build tool e dev server ultra-rápido
- **pnpm** - Gerenciador de pacotes eficiente

---

## 📊 Lógica de Repetição Espaçada

### O Problema: Curva de Esquecimento
Estudos mostram que esquecemos 50% do conteúdo em 24 horas e 90% em uma semana sem revisão.

### A Solução: Repetição Espaçada
O algoritmo agenda revisões baseadas na dificuldade percebida:

| Feedback | Intervalo | Uso Recomendado |
|----------|-----------|-----------------|
| 🔴 Errei | 1 dia | Conteúdo novo ou que você errou |
| 🟡 Bom | 3 dias | Conteúdo que você lembra com esforço |
| 🟢 Fácil | 7 dias | Conteúdo que você domina |

**Efeito Comprovado:**
- Aumenta retenção de longo prazo em até 200%
- Reduz tempo total de estudo em 30-40%
- Otimiza revisões exatamente quando você está prestes a esquecer

---

## 🎯 Funcionalidades Implementadas

### ✅ Checklist de Validação (100% Completo)

- [x] Design finalizado com 4 telas principais
- [x] Navegação inferior com 3 botões
- [x] Dashboard com métricas em tempo real
- [x] Sistema de revisão com flip cards
- [x] Algoritmo de repetição espaçada (1, 3, 7 dias)
- [x] Listagem completa de cards
- [x] Formulário de criação de cards
- [x] Formulário de edição de cards
- [x] Modal de confirmação de exclusão
- [x] Indicadores visuais de status (Novo, Errei, Bom, Fácil)
- [x] Formatação inteligente de datas (Hoje, Amanhã, Em X dias)
- [x] Validação de formulários
- [x] Dados persistentes (localStorage)
- [x] Cards de exemplo pré-carregados
- [x] Design responsivo mobile-first
- [x] Transições e animações suaves
- [x] FAB (Floating Action Button) para criar cards
- [x] Cores da identidade visual aplicadas
- [x] Botões grandes (44px+) para mobile

---

## 🚀 Como Utilizar

### 1. Primeiro Acesso
O app carrega automaticamente com 3 cards de exemplo para você testar.

### 2. Revisar Cards
- Na Dashboard, clique em "Começar Revisão do Dia"
- Leia a pergunta
- Clique em "Revelar Resposta"
- Avalie seu conhecimento (Errei, Bom ou Fácil)
- O card será reagendado automaticamente

### 3. Criar Novo Card
- Clique em "Gerenciar" na navegação inferior
- Clique no botão laranja "+" (canto inferior direito)
- Preencha Disciplina, Pergunta e Resposta
- Clique em "Salvar Flashcard"

### 4. Editar Card
- Vá para "Gerenciar"
- Clique no ícone de lápis ✏️ no card desejado
- Modifique os campos necessários
- Clique em "Salvar Alterações"

### 5. Excluir Card
- Vá para "Gerenciar"
- Clique no ícone de lixeira 🗑️
- Confirme a exclusão no modal

---

## 📈 Diferencial do Projeto

### Problema Real Identificado
Candidatos a concursos públicos têm rotinas administrativas intensas e pouco tempo livre. Ferramentas de estudo tradicionais não aproveitam os pequenos intervalos do dia e não combatem eficientemente a curva de esquecimento.

### Solução Proposta
Um aplicativo mobile (web responsivo) que:
- ✅ Funciona em qualquer intervalo (5-10 minutos)
- ✅ Prioriza revisão ativa vs. leitura passiva
- ✅ Usa ciência da memória (repetição espaçada)
- ✅ Interface simples e direta ao ponto
- ✅ Não requer conexão após carregamento inicial

### Impacto Esperado
- 📚 Maior retenção de conteúdo
- ⏱️ Melhor aproveitamento de tempo ocioso
- 🎯 Foco em questões de bancas
- 📊 Acompanhamento de progresso claro

---

## 🎓 Conceitos Acadêmicos Aplicados

### Gestão de Projeto
- Definição clara de escopo
- Priorização de funcionalidades (MVP)
- Gestão de tempo (entrega em 3 dias)

### UX/UI Design
- Design mobile-first
- Princípios de acessibilidade (botões 44px+)
- Hierarquia visual clara
- Feedback imediato ao usuário

### Desenvolvimento de Software
- Arquitetura componentizada
- Separação de responsabilidades
- Tipagem estática (TypeScript)
- Roteamento SPA
- Persistência de dados

### Ciência Cognitiva
- Curva de esquecimento de Ebbinghaus
- Repetição espaçada (Spaced Repetition)
- Aprendizado ativo vs. passivo
- Recall ativo

---

## 📝 Estrutura de Arquivos

```
src/
├── app/
│   ├── components/
│   │   ├── Dashboard.tsx       # Tela inicial com métricas
│   │   ├── Review.tsx          # Tela de revisão de cards
│   │   ├── Manage.tsx          # Tela de gerenciamento
│   │   ├── CardForm.tsx        # Formulário criar/editar
│   │   ├── Layout.tsx          # Layout com navegação
│   │   └── ui/                 # Componentes de UI base
│   ├── utils/
│   │   └── storage.ts          # Lógica de CRUD e storage
│   ├── routes.tsx              # Configuração de rotas
│   └── App.tsx                 # Componente raiz
├── styles/
│   ├── index.css               # CSS principal
│   ├── theme.css               # Tokens de design
│   └── tailwind.css            # Config Tailwind
└── imports/
    └── pasted_text/
        └── concurseiro-pro-scope.md  # Escopo original
```

---

## 🎨 Capturas de Tela Sugeridas para Relatório

### 1. Dashboard
Mostra as métricas e o botão principal de ação

### 2. Tela de Revisão (Frente)
Card mostrando a pergunta antes de revelar

### 3. Tela de Revisão (Verso)
Card mostrando pergunta + resposta + botões de feedback

### 4. Gerenciamento
Lista de cards com ações de editar/excluir

### 5. Modal de Exclusão
Demonstra a segurança antes de excluir

### 6. Formulário de Novo Card
Mostra os 3 campos e validação

---

## 💡 Possíveis Melhorias Futuras

### Fase 2 (Pós-Entrega)
- [ ] Integração real com Google Sheets via Make/Integromat
- [ ] Gráficos de progresso e estatísticas
- [ ] Modo escuro (dark mode)
- [ ] Categorias/filtros por disciplina
- [ ] Busca de cards
- [ ] Exportar/Importar dados
- [ ] PWA (Progressive Web App) para instalação
- [ ] Notificações push para revisões pendentes

### Fase 3 (Expansão)
- [ ] Modo de estudo em grupo
- [ ] Compartilhamento de decks
- [ ] Banco de questões de bancas reais
- [ ] Sistema de gamificação (pontos, badges)
- [ ] Análise de desempenho por disciplina
- [ ] Integração com calendários

---

## 👨‍🎓 Conclusão

O **Concurseiro Pro** demonstra como tecnologia simples e bem aplicada pode resolver problemas reais de forma eficiente. Utilizando princípios de ciência cognitiva (repetição espaçada) e boas práticas de desenvolvimento (React, TypeScript, design responsivo), o projeto entrega uma solução completa e funcional para candidatos a concursos públicos.

O diferencial está na simplicidade: não há funcionalidades desnecessárias, apenas o essencial para combater a curva de esquecimento e maximizar a retenção de conhecimento nos momentos ociosos do dia a dia administrativo.

---

**Desenvolvido como projeto acadêmico para UniCEUB**
**Curso:** Administração e Gestão Financeira
**Junho de 2026**
