Este é o projeto finalizado de estudo do framework Adonis!

O projeto final está bem diferente do inicial pois decidi que levaria isso como um estudo, fiz um breve curso onde desenvolvi uma aplicação com outros propositos e após aprender como implementar as funcionalidades, 
alterei o projeto para os fins requisitados nas regras de negócio.

Segue instruções para utilização.

1 - Sobre os logins, foi solicitado que o login seja passwordless, então dois emails foram criados para teste, eles já vão ser inseridos ao bando ao rodar a seed, isso pode acarretar em, ao registrar um novo usuário,
a aplicação alegar que não pode inserir pois viola a pk do usuário. Não se preocupe, apartir da terceira tentativa ele irá registrar usuários normalmente pois seguirá o fluxo de id's do banco. Caso esses usuários não
estivessem previamente cadastrados pela seed, esse erro não ocorreria, isso pode ser testado não rodando a seed. Porém, como foi utilizado Mailgun para envio de emails, os emails precisariam estar previamente autorizados
na plataforma, como não teria como realizar isso com novos emails sem um contato direto, deixei esses dois já pré autorizados.

Email 1 para resgate do código de acesso - Produtor/Admnistrador
email: tokendasilvateste@gmail.com
senha: weedoit123

Email 1 para resgate do código de acesso - Produtor/Admnistrador
email: tokentesteadonis@gmail.com
senha: weedoit123

Checar caixa de spam e considerar o email como seguro, depois, acessar a caixa de entrada e aí sim, link estará clicável para acesso.

Agora instruções para acesso a aplicação:

Tecnologias utilizadas e requisitos:

Node.js: versão 20.18.0 ou superior
npm: versão 10.9.0 ou superior
pgAdmin para gerenciar o banco de dados PostgreSQL
Banco de dados PostgreSQL
Redis (opcional para sessões)
Tailwindcss

1 - Clone o repositório:
git clone https://github.com/seu-usuario/learning-adonis.git
cd learning-adonis

2 - Instale as dependencias:
npm install

3 - Configure as variáveis de ambiente:

Se não tiver, crie um arquivo .env e coloque:

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

4 - Rode as migrations do banco para criar as entidades:
node ace migration:run

5 - Rode a seed criada para teste de aplicação:
node ace db:seed

6 - Scripts Disponíveis
npm start: Inicia o servidor em produção.
npm run dev: Inicia o servidor em modo de desenvolvimento com hot-reload.
npm run build: Compila o código para produção.
npm test: Executa os testes.
npm run lint: Executa o linter (ESLint).
npm run format: Formata o código com Prettier.
npm run typecheck: Verifica os tipos com TypeScript.

7 - Para iniciar o projeto:
npm run dev
Cheque a aplicação via host: http://localhost:3333


Em caso de problemas com o setup podem entrar em contato via email kostrischdeveloper@gmail.com!

Obrigada :)
