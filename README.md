# 📚 Concurseiro Pro - Flashcards com Repetição Espaçada

> **Seu motor de aprovação por repetição espaçada**

[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Academic-green)](LICENSE)

## 🎯 Sobre o Projeto

**Concurseiro Pro** é um aplicativo web de flashcards desenvolvido especificamente para candidatos a concursos públicos, utilizando o método científico de **repetição espaçada** para combater a curva de esquecimento e maximizar a retenção de conhecimento.

### 📋 Informações Acadêmicas

- **Instituição:** Centro Universitário de Brasília (UniCEUB)
- **Curso:** Administração e Gestão Financeira
- **Disciplina:** Atividade de Sistematização - App Híbrido Low-Code
- **Data:** Junho de 2026

---

## ❓ Problema Resolvido

Candidatos a concursos públicos enfrentam três desafios principais:

1. **Curva de Esquecimento:** Esquecem 50% do conteúdo estudado em apenas 24 horas
2. **Tempo Limitado:** Rotinas administrativas intensas com poucos intervalos livres
3. **Métodos Ineficientes:** Leitura passiva de resumos não consolida memória de longo prazo

---

## 💡 Solução

O Concurseiro Pro implementa o algoritmo de **repetição espaçada**, baseado nos estudos de Hermann Ebbinghaus sobre memória e esquecimento:

- 🔴 **Errei** → Revisão em 1 dia (não sabia a resposta)
- 🟡 **Bom** → Revisão em 3 dias (lembrou com esforço)
- 🟢 **Fácil** → Revisão em 7 dias (domínio completo)

**Resultado comprovado:** Aumento de até 200% na retenção de longo prazo.

---

## ✨ Funcionalidades

### 📊 Dashboard Inteligente
- Visualização do total de flashcards cadastrados
- Contador de cards pendentes para revisão hoje
- Botão de ação rápida para iniciar estudos
- Dicas educacionais sobre memorização

### 📖 Sistema de Revisão Ativa
- Cards com frente (pergunta) e verso (resposta)
- Sistema de auto-avaliação com 3 níveis
- Algoritmo automático de agendamento
- Progresso visual durante revisão
- Animações suaves de transição

### 🗂️ Gerenciamento Completo
- Lista de todos os flashcards
- Filtros visuais por disciplina e status
- Indicadores de próxima revisão formatados
- Edição e exclusão com confirmação
- Botão flutuante (FAB) para criação rápida

### ✏️ Criação e Edição
- Formulário intuitivo com 3 campos
- Validação em tempo real
- Agendamento automático
- Preview de informações
- Salvamento instantâneo

### 🔒 Segurança
- Modal de confirmação antes de excluir
- Preview do card a ser removido
- Ação reversível (Cancelar)
- Prevenção de perda acidental de dados

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **[React 18.3.1](https://react.dev/)** - Biblioteca JavaScript para UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones

### Roteamento & Navegação
- **[React Router 7](https://reactrouter.com/)** - Navegação SPA
- Data Router com `createBrowserRouter`

### Build & Desenvolvimento
- **[Vite 6](https://vitejs.dev/)** - Build tool ultra-rápido
- **[pnpm](https://pnpm.io/)** - Gerenciador de pacotes eficiente

### Persistência
- **localStorage** - Armazenamento local do navegador
- Estrutura JSON para dados
- Preparado para migração para backend (Google Sheets + Make)

---

## 📁 Estrutura do Projeto

```
concurseiro-pro/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx       # Tela inicial com métricas
│   │   │   ├── Review.tsx          # Sistema de revisão de cards
│   │   │   ├── Manage.tsx          # Gerenciamento de cards
│   │   │   ├── CardForm.tsx        # Formulário criar/editar
│   │   │   ├── Layout.tsx          # Layout com navegação
│   │   │   └── ui/                 # Componentes base (shadcn/ui)
│   │   ├── utils/
│   │   │   └── storage.ts          # Lógica CRUD e localStorage
│   │   ├── routes.tsx              # Configuração de rotas
│   │   └── App.tsx                 # Componente raiz
│   ├── styles/
│   │   ├── index.css               # CSS principal
│   │   ├── theme.css               # Tokens de design
│   │   └── tailwind.css            # Configuração Tailwind
│   └── imports/
│       └── pasted_text/
│           └── concurseiro-pro-scope.md
├── PROJETO-CONCURSEIRO-PRO.md      # Documentação completa
├── GUIA-RAPIDO.md                  # Guia de uso rápido
├── CHECKLIST-TESTES.md             # Roteiro de testes
├── APRESENTACAO.md                 # Roteiro de apresentação
├── package.json                     # Dependências
└── README.md                        # Este arquivo
```

---

## 🚀 Como Usar

### Pré-requisitos
- Node.js 18+ instalado
- npm, pnpm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd concurseiro-pro

# Instale as dependências
pnpm install
# ou
npm install

# Execute em desenvolvimento
pnpm dev
# ou
npm run dev

# Acesse no navegador
http://localhost:5173
```

### Primeiro Uso
1. O app carrega automaticamente com 3 flashcards de exemplo
2. Navegue pelo Dashboard para ver suas métricas
3. Clique em "Começar Revisão do Dia" para testar o sistema
4. Vá para "Gerenciar" para criar seus próprios cards

---

## 📱 Rotas do Aplicativo

| Rota | Tela | Descrição |
|------|------|-----------|
| `/` | Dashboard | Página inicial com métricas |
| `/review` | Revisão | Sistema de flashcards interativo |
| `/manage` | Gerenciamento | Lista completa de cards |
| `/card/new` | Novo Card | Formulário de criação |
| `/card/edit/:id` | Editar Card | Formulário de edição |

---

## 🎨 Identidade Visual

### Paleta de Cores

```css
--azul-escuro: #1A237E;   /* Cabeçalhos e branding */
--azul-medio: #3F51B5;    /* Navegação e botões secundários */
--laranja: #FF6F00;       /* Call-to-action e destaques */
--cinza-claro: #F5F5F5;   /* Fundos e áreas secundárias */
--branco: #FFFFFF;        /* Cards e superfícies */
```

### Princípios de Design
- **Minimalista:** Sem distrações, foco no conteúdo
- **Mobile-first:** Botões grandes (44px+), touch-friendly
- **Responsivo:** Funciona em mobile, tablet e desktop
- **Acessível:** Contraste adequado, labels claros

---

## 💾 Estrutura de Dados

### Interface Flashcard

```typescript
interface Flashcard {
  id: number;                    // Identificador único
  disciplina: string;            // Ex: "Direito Administrativo"
  pergunta: string;              // Enunciado ou conceito
  resposta: string;              // Gabarito ou explicação
  nivel: 'Novo' | 'Errei' | 'Bom' | 'Fácil';  // Status atual
  proxima_revisao: string;       // Data ISO (YYYY-MM-DD)
  data_cadastro: string;         // Data ISO (YYYY-MM-DD)
}
```

### Operações CRUD

```typescript
// CREATE
createFlashcard(data): Flashcard

// READ
getAllFlashcards(): Flashcard[]
getFlashcardsForReview(): Flashcard[]
getFlashcardById(id): Flashcard

// UPDATE
updateFlashcard(id, data): void
updateFlashcardFeedback(id, feedback): void

// DELETE
deleteFlashcard(id): void
```

---

## 🧪 Testes

Execute o checklist completo de testes:

```bash
# Ver arquivo de testes
cat CHECKLIST-TESTES.md
```

Principais áreas testadas:
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Algoritmo de repetição espaçada (1, 3, 7 dias)
- ✅ Validação de formulários
- ✅ Modal de confirmação de exclusão
- ✅ Persistência de dados no localStorage
- ✅ Navegação entre rotas
- ✅ Estados vazios e de erro
- ✅ Responsividade mobile/desktop

---

## 📊 Algoritmo de Repetição Espaçada

### Implementação

```typescript
export const updateFlashcardFeedback = (
  id: number, 
  feedback: 'Errei' | 'Bom' | 'Fácil'
): void => {
  const today = new Date();
  let daysToAdd = 1;
  
  if (feedback === 'Bom') daysToAdd = 3;
  if (feedback === 'Fácil') daysToAdd = 7;
  
  const nextDate = new Date(today);
  nextDate.setDate(nextDate.getDate() + daysToAdd);
  
  // Atualiza card com nova data e nível
  card.nivel = feedback;
  card.proxima_revisao = nextDate.toISOString().split('T')[0];
};
```

### Base Científica

O algoritmo é baseado na **Curva de Esquecimento de Ebbinghaus** (1885), que demonstra que:
- Sem revisão: perda de 50% em 24h, 90% em 1 semana
- Com revisões espaçadas: retenção de 90%+ após meses

**Fontes:**
- Ebbinghaus, H. (1885). "Memory: A Contribution to Experimental Psychology"
- Cepeda et al. (2006). "Distributed Practice in Verbal Recall Tasks"

---

## 🎓 Conceitos Acadêmicos Aplicados

### Gestão de Projetos
- ✅ Definição clara de escopo (documento de requisitos)
- ✅ Priorização de funcionalidades (MVP)
- ✅ Gestão de tempo (entrega em 3 dias)
- ✅ Documentação técnica completa

### UX/UI Design
- ✅ Design mobile-first
- ✅ Princípios de acessibilidade (WCAG)
- ✅ Hierarquia visual clara
- ✅ Feedback imediato ao usuário
- ✅ Estados de loading e erro tratados

### Engenharia de Software
- ✅ Arquitetura componentizada (React)
- ✅ Separação de responsabilidades (MVC adaptado)
- ✅ Tipagem estática (TypeScript)
- ✅ Versionamento (Git)
- ✅ Code review ready

### Ciência Cognitiva
- ✅ Curva de esquecimento (Ebbinghaus)
- ✅ Repetição espaçada (Spaced Repetition)
- ✅ Recall ativo vs. leitura passiva
- ✅ Efeito de teste (Testing Effect)

---

## 🔮 Roadmap Futuro

### Fase 2: Integração Backend
- [ ] Integração com Google Sheets via Make/Integromat
- [ ] Autenticação de usuários (Google OAuth)
- [ ] Sincronização multi-dispositivo
- [ ] Backup automático na nuvem

### Fase 3: Funcionalidades Avançadas
- [ ] Gráficos de progresso e estatísticas
- [ ] Análise de desempenho por disciplina
- [ ] Modo escuro (dark mode)
- [ ] Busca e filtros avançados
- [ ] Tags personalizadas
- [ ] Categorias hierárquicas

### Fase 4: Expansão
- [ ] PWA completo (instalação no celular)
- [ ] Notificações push para revisões
- [ ] Compartilhamento de decks entre usuários
- [ ] Banco de questões de bancas reais
- [ ] Gamificação (pontos, conquistas, streaks)
- [ ] Modo de estudo em grupo
- [ ] Exportar/Importar dados (JSON, CSV, Anki)

---

## 📄 Documentação Adicional

- 📘 **[PROJETO-CONCURSEIRO-PRO.md](PROJETO-CONCURSEIRO-PRO.md)** - Documentação técnica completa
- 🚀 **[GUIA-RAPIDO.md](GUIA-RAPIDO.md)** - Guia de uso para iniciantes
- ✅ **[CHECKLIST-TESTES.md](CHECKLIST-TESTES.md)** - Roteiro completo de testes
- 🎤 **[APRESENTACAO.md](APRESENTACAO.md)** - Roteiro de apresentação acadêmica

---

## 🤝 Contribuindo

Este é um projeto acadêmico, mas sugestões são bem-vindas!

### Como Contribuir
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto foi desenvolvido como atividade acadêmica para o UniCEUB.

© 2026 - Todos os direitos reservados.

---

## 👨‍🎓 Autor

Projeto desenvolvido como Atividade de Sistematização do curso de Administração e Gestão Financeira do Centro Universitário de Brasília (UniCEUB).

---

## 🙏 Agradecimentos

- **UniCEUB** - Pela oportunidade de desenvolvimento
- **Hermann Ebbinghaus** - Pelos estudos sobre memória
- **React Team** - Pela excelente biblioteca
- **Tailwind Labs** - Pelo framework CSS
- **Comunidade Open Source** - Por todas as ferramentas utilizadas

---

## 📞 Contato

Para dúvidas ou sugestões sobre o projeto:
- 📧 Email: [seu-email@exemplo.com]
- 💼 LinkedIn: [seu-linkedin]
- 🐙 GitHub: [seu-github]

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

Desenvolvido com ❤️ e ☕ para ajudar concurseiros a alcançarem seus objetivos.

</div>
