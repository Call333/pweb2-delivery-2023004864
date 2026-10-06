# Delivery Tracker — Exercício do Capítulo 4

> **Programação Web II — IFAL/Maceió.** Este é o **projeto do semestre** (avaliado). No Cap. 4 você
> inicia a **Delivery Tracker API** com **arquitetura em camadas** e, depois, **Repository Pattern +
> injeção de dependência**. A correção é **automática** (autograder de conformidade) + arquitetura.

## Como usar este repositório

1. Clique em **"Use this template"** e crie **`pweb2-delivery-<matricula>`** (ex.: `pweb2-delivery-20231012345`).
   Este é o repositório que você usará o **semestre inteiro** (evolui a cada capítulo).
2. Clone, instale e rode:
   ```bash
   npm install
   npm start                                        # http://localhost:3000
   # em outro terminal — autograder:
   npm run check                                    # = BASE_URL=http://localhost:3000 node autograder/check.mjs
   ```
3. A cada `git push`, o **GitHub Actions** roda o autograder e mostra a nota na aba **Actions**
   (resumo do job). O `autograder/check.mjs` é **aberto** — leia para saber exatamente o que se espera.

## O que implementar (em `src/`)

```
src/
├── controllers/   # traduz HTTP ↔ service (sem regra de negócio)
├── services/      # TODA a regra de negócio
├── repositories/  # só acesso a dados
├── database/      # persistência SIMULADA em memória (sem banco real, sem ORM)
├── routes/        # composição das dependências (injeção) + monta em /api
└── utils/
```

- **Regra de negócio só no Service.** Injeção de dependência no **composition root** (`src/routes`).
- O `server.js` só configura o app (já traz o `GET /api/health` exigido — não remova).

## Duas etapas (ver os enunciados completos)

- **Atividade 05 — Entregas em camadas:** CRUD de `/api/entregas`, ciclo de status
  (`CRIADA → EM_TRANSITO → ENTREGUE`/`CANCELADA`), histórico. Meta: checagens de **Entregas** verdes.
- **Atividade 06 — Motoristas + Contratos + DI:** `/api/motoristas`, atribuição de motorista,
  contratos de repository (JSDoc) e composição num ponto único. Meta: **122/122**.

> O critério de **inversão de dependência** é verificado pelo professor **trocando o repository por
> um Mock** que respeita o contrato — programe contra o contrato desde o início.

## Documentação da API (End-points Mapeados)

Todos os end-points utilizam o prefixo global `/api` estruturado no servidor principal.

### 📦 Módulo de Entregas (Encomendas)

| Verbo | Rota | Descrição | Status HTTP comum |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/entregas` | Regista uma nova entrega no sistema. | `201`, `400`, `409` |
| **GET** | `/api/entregas` | Lista todas as encomendas (com suporte a filtro `?status=`). | `200` |
| **GET** | `/api/entregas/:id` | Procura e devolve as encomendas registradas (com suporte a filtro `?status=`). | `200` |
| **GET** | `/api/entregas/:id/historico` | Devolve a lista de eventos e transições de uma entrega. | `200`, `404` |
| **PATCH** | `/api/entregas/:id/avancar` | Avança o ciclo de status (`CRIADA → EM_TRANSITO → ENTREGUE`). | `200`, `404`, `422` |
| **PATCH** | `/api/entregas/:id/cancelar` | Cancela uma entrega (desde que não esteja `ENTREGUE`). | `200`, `404`, `422` |
| **PATCH** | `/api/entregas/:id/atribuir` | Vincula um motorista ativo a uma entrega no estado `CRIADA`. | `200`, `404`, `422` |

### 🪪 Módulo de Motoristas

| Verbo | Rota | Descrição | Status HTTP comum |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/motoristas` | Regista um novo motorista com status inicial `ATIVO`. | `201`, `400`, `409` |
| **GET** | `/api/motoristas` | Lista todos os motoristas registados (com suporte a filtro `?status=`). | `200` |
| **GET** | `/api/motoristas/:id` | Procura e devolve os detalhes estruturados de um motorista. | `200`, `404` |
| **GET** | `/api/motoristas/:id/entregas` | Lista apenas as encomendas atribuídas àquele motorista específico. | `200`, `404` |

### 🛠️ Configurações de Sistema Gerais
- **GET** `/api/health` → Retorna `{ "status": "ok" }` para validação do contrato de execução.

## Contrato (resumo)

- Base `/api` · JSON · erro `{ "erro": "..." }` · `GET /api/health` → `{ "status": "ok" }`.
- Status: `201` criar · `400` entrada inválida · `404` não encontrado · `409` unicidade
  (duplicata/CPF) · `422` regra de estado (transição/atribuição inválida).
- Execução: `npm start`, respeita `process.env.PORT`, branch `main`.

Faça **um commit por avanço** (Conventional Commits, ex.: `feat(entregas): valida origem ≠ destino`).
Bom trabalho! 🚀
