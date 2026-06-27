# 🚀 Guia Rápido - Concurseiro Pro

## 📱 Como Navegar no App

### Dashboard (Tela Inicial)
- Ver total de cards cadastrados
- Ver quantos cards precisam de revisão hoje
- Clicar em **"Começar Revisão do Dia"** para estudar

### Revisar Cards
1. Leia a **pergunta**
2. Clique em **"Revelar Resposta"**
3. Escolha seu nível de conhecimento:
   - 🔴 **Errei** = revisão amanhã
   - 🟡 **Bom** = revisão em 3 dias
   - 🟢 **Fácil** = revisão em 7 dias

### Gerenciar Cards
- Ver todos os seus flashcards
- **Botão + laranja** = criar novo card
- **Lápis** = editar card
- **Lixeira** = excluir card (com confirmação)

### Criar/Editar Card
1. Digite a **Disciplina** (ex: Direito Administrativo)
2. Digite a **Pergunta** (o que você quer memorizar)
3. Digite a **Resposta** (gabarito/explicação)
4. Clique em **"Salvar Flashcard"**

---

## 🎯 Algoritmo de Repetição Espaçada

| Feedback | Intervalo | Quando Usar |
|----------|-----------|-------------|
| 🔴 Errei | +1 dia | Não sabia a resposta |
| 🟡 Bom | +3 dias | Lembrei com esforço |
| 🟢 Fácil | +7 dias | Sabia imediatamente |

---

## 📊 Dados de Demonstração

O app vem com **3 cards de exemplo**:
1. Direito Administrativo - Princípios LIMPE
2. AFO - Princípio da Anualidade  
3. Português - "Há" vs "A"

---

## 💾 Persistência de Dados

- Os dados ficam salvos no navegador (localStorage)
- Mesmo fechando e abrindo, seus cards permanecem
- Funciona offline após carregar a primeira vez

---

## 🎨 Cores do App

- **Azul escuro (#1A237E)** = Cabeçalhos
- **Azul médio (#3F51B5)** = Navegação e botões secundários
- **Laranja (#FF6F00)** = Botão principal e destaques
- **Cinza claro (#F5F5F5)** = Fundos

---

## ✅ Funcionalidades Principais

✓ Dashboard com métricas em tempo real  
✓ Sistema de flashcards com frente/verso  
✓ Algoritmo de repetição espaçada (1/3/7 dias)  
✓ Criar novos flashcards  
✓ Editar flashcards existentes  
✓ Excluir com confirmação de segurança  
✓ Visualizar todos os cards e suas próximas revisões  
✓ Design mobile-first responsivo  
✓ Navegação intuitiva com 3 seções  

---

## 🎓 Para a Apresentação

### Fluxo de Demonstração Sugerido:

1. **Mostrar Dashboard**
   - Explicar as métricas
   - Destacar quantos cards pendentes

2. **Fazer uma Revisão**
   - Clicar em "Começar Revisão"
   - Ler pergunta → Revelar resposta
   - Escolher feedback (explicar a lógica)
   - Mostrar próximo card

3. **Gerenciar Cards**
   - Mostrar lista completa
   - Apontar informações (disciplina, status, próxima data)
   - Mostrar modal de exclusão (segurança)

4. **Criar Novo Card**
   - Clicar no botão +
   - Preencher formulário
   - Mostrar validação
   - Salvar e ver na lista

5. **Editar um Card**
   - Clicar no lápis
   - Modificar conteúdo
   - Salvar alterações

---

## 💡 Pontos a Destacar

### Problema que Resolve:
"Concurseiros têm pouco tempo e esquecem 50% do conteúdo em 24h sem revisão"

### Solução:
"App mobile com repetição espaçada cientificamente comprovada"

### Diferencial:
"Usa intervalos ociosos do dia para revisão ativa, não leitura passiva"

### Tecnologia:
"React + TypeScript + Tailwind CSS para web app responsivo"

### Resultado:
"Aumento de até 200% na retenção de longo prazo"

---

## 🔑 Termos-Chave para o Relatório

- **Repetição Espaçada** (Spaced Repetition)
- **Curva de Esquecimento** (Ebbinghaus)
- **Recall Ativo** (Active Recall)
- **MVP** (Minimum Viable Product)
- **Mobile-First Design**
- **SPA** (Single Page Application)
- **CRUD** (Create, Read, Update, Delete)
- **UX/UI Design**
- **PWA-Ready** (Progressive Web App)

---

## 📸 Screenshots Essenciais

1. ✅ Dashboard inicial
2. ✅ Card mostrando pergunta
3. ✅ Card mostrando resposta + botões feedback
4. ✅ Lista de gerenciamento
5. ✅ Modal de confirmação de exclusão
6. ✅ Formulário de criação/edição

---

## ⏱️ Timing de Apresentação (5-7 minutos)

- **0:00-1:00** → Contexto: problema dos concurseiros
- **1:00-2:00** → Solução: repetição espaçada explicada
- **2:00-4:00** → Demo ao vivo (seguir fluxo acima)
- **4:00-5:00** → Tecnologias e arquitetura
- **5:00-7:00** → Resultados esperados e perguntas

---

## 🎯 Se Perguntarem...

**"Por que não usar app existente como Anki?"**
→ "Anki é complexo e desktop-first. Nosso foco é mobile, simplicidade e contexto brasileiro de concursos"

**"Como garante que o usuário vai usar?"**
→ "Gamificação implícita (ver progresso), notificações futuras, e solução de dor real"

**"E se quiser integrar com backend real?"**
→ "Arquitetura já preparada, basta trocar localStorage por API calls ao Google Sheets via Make"

**"Quanto tempo levou para desenvolver?"**
→ "3 dias de desenvolvimento focado, seguindo escopo bem definido"

---

**Boa sorte na apresentação! 🚀📚**
