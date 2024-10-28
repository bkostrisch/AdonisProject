# Projeto Final de Estudo do Framework Adonis

Este é o projeto finalizado de estudo do framework Adonis! O projeto final está bem diferente do inicial pois decidi que levaria isso como um estudo, fiz um breve curso onde desenvolvi uma aplicação com outros propósitos e, após aprender como implementar as funcionalidades, alterei o projeto para os fins requisitados nas regras de negócio.


## Instruções para Acesso à Aplicação

### Opção 01 - Docker

**Executando o Projeto com Docker**

1. **Clone o Repositório e Entre na Pasta:**
   ```bash
   git clone https://github.com/seu-usuario/learning-adonis.git && cd learning-adonis
   ```

2. **Suba o Projeto com Docker Compose:**
   ```bash
   docker-compose up
   ```

3. **Acesse a Aplicação:**
   - [http://localhost:3333](http://localhost:3333)

### Opção 02 - Ambiente Manual

#### Tecnologias Utilizadas e Requisitos:

- **Node.js**: versão 20.18.0 ou superior
- **npm**: versão 10.9.0 ou superior
- **pgAdmin** para gerenciar o banco de dados PostgreSQL
- **Banco de dados PostgreSQL**
- **Redis** (opcional para sessões)
- **Tailwindcss**

#### Passo a Passo

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/learning-adonis.git
   cd learning-adonis
   ```

2. **Instale as Dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**

   Se não tiver, crie um arquivo `.env` e adicione o seguinte conteúdo:

   ```plaintext
   TZ=UTC
   PORT=3333
   HOST=localhost
   LOG_LEVEL=info
   APP_KEY=luQ2mh9caOFONS9wQ0d-Pv0QB01-Hrxe
   NODE_ENV=development
   SESSION_DRIVER=cookie
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=SuaSenhaDoBancoDeDados
   DB_DATABASE=Adonis6
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   REDIS_PASSWORD=
   MAIL_DRIVER=mailgun
   MAILGUN_API_KEY=54b6956d17924001f28a3039a5ba3f83-784975b6-7486c9f1
   MAILGUN_DOMAIN=sandbox3f2f1073d9b94570aaf28190aa5f852f.mailgun.org
   MAILGUN_FROM=postmaster@sandbox3f2f1073d9b94570aaf28190aa5f852f.mailgun.org
   ```

4. **Rode as Migrations do Banco para Criar as Entidades:**
   ```bash
   node ace migration:run
   ```

5. **Rode a Seed Criada para Teste de Aplicação:**
   ```bash
   node ace db:seed
   ```

6. **Scripts Disponíveis:**

   - `npm start`: Inicia o servidor em produção.
   - `npm run dev`: Inicia o servidor em modo de desenvolvimento com hot-reload.
   - `npm run build`: Compila o código para produção.
   - `npm test`: Executa os testes.
   - `npm run lint`: Executa o linter (ESLint).
   - `npm run format`: Formata o código com Prettier.
   - `npm run typecheck`: Verifica os tipos com TypeScript.

7. **Para Iniciar o Projeto:**
   ```bash
   npm run dev
   ```

   Cheque a aplicação via host: [http://localhost:3333](http://localhost:3333)

---

Em caso de problemas com o setup, podem entrar em contato via email: kostrischdeveloper@gmail.com

Obrigada :)
