Aqui está o escopo completo e atualizado do projeto, estruturado para ser a sua diretriz exata de desenvolvimento e o documento base para a sua entrega final.

Como o prazo de entrega no CEUB é dia 28 de junho, e hoje já é dia 25, este escopo foi desenhado para ser direto, garantindo que você consiga focar na lógica principal e finalizar tudo confortavelmente até o dia 27.

---

### 🎯 Escopo Final de Projeto — App "Concurseiro Pro: Flashcards"

**Atividade de Sistematização — App Híbrido Low-Code**
**UniCEUB | Curso: Administração e Gestão Financeira**

#### 📌 IDENTIDADE DO APP

* **Nome:** Concurseiro Pro
* **Subtítulo:** Seu motor de aprovação por repetição espaçada
* **Problema resolvido:** A curva de esquecimento. Concurseiros perdem muito tempo apenas lendo resumos e esquecem o conteúdo rapidamente. Faltam ferramentas mobile simples para revisão ativa focada em questões de bancas, permitindo estudar em qualquer intervalo da rotina administrativa.
* **Público-alvo:** Candidatos a concursos públicos com pouco tempo livre, que precisam de um método eficiente de memorização no celular.
* **Plataformas:** Android e iOS (App Híbrido via Make/Integromat + Figma).

---

#### 🗃️ BANCO DE DADOS (Google Sheets)

Crie uma planilha no Google Sheets com o nome "ConcurseiroPro_DB" e a seguinte aba:

**Aba: flashcards**

| Coluna | Tipo | Descrição |
| --- | --- | --- |
| **id** | Número (auto) | Identificador único do card |
| **disciplina** | Texto | Nome da matéria (ex: Direito Administrativo, AFO) |
| **pergunta** | Texto | Enunciado da questão ou conceito (Frente) |
| **resposta** | Texto | Gabarito ou explicação (Verso) |
| **nivel** | Texto | Última avaliação: Novo, Errei, Bom, Fácil |
| **proxima_revisao** | Data | Data em que o card deve aparecer novamente |
| **data_cadastro** | Data | Data de criação do registro |

---

#### 📱 TELAS DO APP (Figma)

**Identidade Visual:**

* **Cores:** Azul escuro (#1A237E), Azul médio (#3F51B5), Laranja (#FF6F00) para destaque, Cinza claro (#F5F5F5) para fundos.
* **Estilo:** Minimalista, cards com bordas de 8px, botões grandes (mínimo 44px de altura) para facilitar o toque no celular. Tipografia Inter ou Roboto.

**TELA 1 — Dashboard (Home)**

* **Header:** "Concurseiro Pro" + Ícone de perfil.
* **Cards de Métricas:** 1) Total de flashcards cadastrados | 2) Cartões pendentes para revisar HOJE.
* **Ação Principal:** Botão grande e laranja "Começar Revisão do Dia" (direciona para a Tela 2).
* **Barra de Navegação Inferior:** Home | Revisar | Gerenciar.

**TELA 2 — O Flashcard (A Revisão Ativa)**

* **Header:** Nome da disciplina do card atual.
* **Card Central (Frente):** Exibe a `pergunta` em texto grande e de fácil leitura.
* **Ação Intermediária:** Botão "Revelar Resposta". Ao clicar, a área inferior do card aparece.
* **Card Central (Verso):** Exibe a `resposta` detalhada.
* **Botões de Feedback (Disparam o Update):**
* 🔴 **Errei** (Agenda para amanhã)
* 🟡 **Bom** (Agenda para daqui a 3 dias)
* 🟢 **Fácil** (Agenda para daqui a 7 dias)



**TELA 3 — Gerenciamento (Listagem Completa)**

* **Título:** "Meus Flashcards".
* **Lista:** Cards resumidos mostrando a pergunta, disciplina e um indicativo visual da data da `proxima_revisao`.
* **Ações:** Ícones de Lápis (Editar) e Lixeira (Excluir) em cada item. O botão de exclusão exige modal de confirmação.
* **Botão Flutuante (FAB):** "+" para adicionar um novo card.

**TELA 4 — Cadastro / Edição de Card**

* **Campos do Formulário:** Disciplina, Pergunta (multilinha), Resposta (multilinha).
* *Nota estrutural:* Não é necessário que o usuário digite a data. O sistema define a primeira revisão para o mesmo dia e o nível como "Novo".
* **Botões:** "Salvar Flashcard" (primário) e "Cancelar" (secundário).

---

#### ⚙️ CENÁRIOS NO MAKE (Integromat) — CRUD Inteligente

**Cenário 1 — CRUD-Create-Card**

* **Trigger:** Webhook recebe os dados do formulário de Cadastro (disciplina, pergunta, resposta).
* **Ação:** Módulo Google Sheets -> "Add a Row".
* **Lógica:** `id` automático gerado, `proxima_revisao` recebe a data atual (`{{now}}`), `nivel` recebe a string "Novo".
* Retornar resposta de sucesso.

**Cenário 2 — CRUD-Read-Revisao**

* **Trigger:** Webhook acionado ao clicar em "Começar Revisão do Dia".
* **Ação:** Módulo Google Sheets -> "Search Rows".
* **Lógica Crucial:** Configurar o filtro para buscar apenas linhas onde `proxima_revisao` seja menor ou igual a hoje. Retornar os registros em JSON para o app.

**Cenário 3 — CRUD-Update-Algoritmo**

* **Trigger:** Webhook recebe o `id` do card e o botão de feedback clicado (Errei, Bom ou Fácil).
* **Ação:** Módulo Google Sheets -> "Update a Row".
* **Lógica de Cálculo:** Use a função de data do Make para somar dias à data atual:
* Se Errei = `{{addDays(now; 1)}}`
* Se Bom = `{{addDays(now; 3)}}`
* Se Fácil = `{{addDays(now; 7)}}`


* Atualizar também a coluna `nivel` com a opção escolhida.

**Cenário 4 — CRUD-Delete-Card**

* **Trigger:** Webhook recebe o `id` do card após confirmação do modal de exclusão no app.
* **Ação:** Módulo Google Sheets -> "Delete a Row".
* Retornar sucesso.

---

### 📋 CHECKLIST DE VALIDAÇÃO (Prioridade Máxima)

* [ ] O design no Figma está finalizado, utilizando os 4 botões de navegação e espaçamentos padronizados?
* [ ] O Cenário 3 (Update) do Make está calculando as datas corretamente ao clicar em Errei/Bom/Fácil?
* [ ] O botão de DELETE possui um pop-up de segurança ("Tem certeza que deseja excluir?") antes de rodar o cenário?
* [ ] A planilha do Google Sheets tem exatamente os nomes de coluna definidos no escopo?
* [ ] **PDF de Entrega:** Inclui a capa, o link público do Figma, prints das 4 operações do CRUD funcionando (com o modal de exclusão visível) e uma breve conclusão destacando que a lógica de espaçamento resolve o problema de memorização.
* [ ] Revisão final de links até o dia 27 de junho, garantindo margem de segurança antes do envio no dia 28.