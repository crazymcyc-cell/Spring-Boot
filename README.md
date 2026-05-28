# 🚀 TaskFlow - Gerenciador de Tarefas Full Stack

Um sistema moderno de gerenciamento de tarefas estilo Kanban, desenvolvido para demonstrar habilidades no desenvolvimento Full Stack utilizando o ecossistema Spring (Java) no backend e React no frontend.

## ✨ Funcionalidades

- **CRUD Completo:** Crie, leia, atualize e delete tarefas.
- **Kanban Board:** Organize tarefas por status (Pendente, Em Andamento, Concluída).
- **API RESTful:** Backend estruturado seguindo as melhores práticas REST.
- **Design Responsivo:** Interface moderna e acessível desenvolvida com Tailwind CSS.
- **CORS Configurado:** Comunicação fluida entre diferentes domínios (Frontend e Backend).

## 🛠️ Tecnologias Utilizadas

### Backend

- **Java 21**
- **Spring Boot 3** (Web, Data JPA, Validation)
- **H2 Database** (Banco de dados em memória para fácil teste, configurável para PostgreSQL/MySQL)
- **Lombok** (Redução de boilerplate)
- **Maven** (Gerenciamento de dependências)

### Frontend

- **React.js** (Hooks, Functional Components)
- **Tailwind CSS** (Estilização utilitária)
- **Lucide React** (Ícones)
- **Vite** (Build tool e Dev Server)

## ⚙️ Como executar o projeto localmente

### 1. Clonando o repositório

```bash
git clone https://github.com/SEU_USUARIO/taskflow.git
cd taskflow
```

### 2. Rodando o Backend (Spring Boot)

1. Navegue até a pasta `backend`.
2. Certifique-se de ter o Java 21+ e o Maven instalados.
3. Execute o comando:

```bash
mvn spring-boot:run
```

> O servidor iniciará na porta `8080`. (Acesso ao banco H2: `http://localhost:8080/h2-console`)

### 3. Rodando o Frontend (React)

1. Navegue até a pasta `frontend`.
2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

> O frontend estará disponível em `http://localhost:5173`.

## 📡 Endpoints da API

| Método   | Rota              | Descrição                                        |
| -------- | ----------------- | ------------------------------------------------ |
| `GET`    | `/api/tasks`      | Retorna todas as tarefas                         |
| `GET`    | `/api/tasks/{id}` | Retorna uma tarefa específica                    |
| `POST`   | `/api/tasks`      | Cria uma nova tarefa                             |
| `PUT`    | `/api/tasks/{id}` | Atualiza uma tarefa existente (ex: mudar status) |
| `DELETE` | `/api/tasks/{id}` | Remove uma tarefa                                |

---
