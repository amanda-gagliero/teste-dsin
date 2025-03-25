📌 Sistema de Agendamento - Salão de Beleza

📝Este sistema foi desenvolvido para permitir o agendamento de serviços em um salão de beleza. 

Ele oferece:
Cadastro de clientes.
Agendamento de serviços vinculados a um cliente.
Edição e cancelamento de agendamentos.
Regra de alteração: Agendamentos só podem ser editados até 2 dias antes da data marcada.
Listagem dos agendamentos realizados, exibindo nome do cliente, serviço e data.
Interface simples e intuitiva para facilitar a experiência do usuário.
Banco de dados persistente utilizando SQLite, garantindo que os dados não sejam perdidos ao reiniciar o servidor.
🛠 Tecnologias Utilizadas
O sistema foi desenvolvido utilizando as seguintes tecnologias:

👨‍💻 Backend (Servidor)
Node.js: Ambiente de execução JavaScript.
Express: Framework para criar a API do backend.
SQLite: Banco de dados leve e eficiente para armazenar clientes e agendamentos.
Cors: Permite comunicação entre frontend e backend.

🎨 Frontend (Interface do Usuário)
HTML: Estrutura das páginas.
CSS: Estilos visuais utulizando as cores roxo e rosa claro.
JavaScript (Vanilla JS): Para conectar o frontend ao backend e atualizar dinamicamente a interface.

🚀 Como Rodar o Projeto
1️⃣ Instalar as Dependências
Abra o terminal no VS Code e execute os seguintes comandos:
cd backend
npm install

2️⃣ Rodar o Servidor (Backend)
Execute o comando:
node server.js
✅ Se aparecer "Servidor rodando na porta 3000", está tudo ok!

3️⃣ Rodar o Frontend (Interface Gráfica)
Vá até a pasta frontend no Explorador de Arquivos e clique duas vezes no arquivo index.html para abrir no navegador.
Cadastre um cliente e faça um agendamento!

🗄 Como Consultar o Banco de Dados SQLite
O banco de dados é salvo no arquivo database.sqlite dentro da pasta backend. Para visualizar ou editar os dados, siga um dos métodos abaixo:

🔹 Opção 1: Usar o Terminal do VS Code
1- Abra o terminal e acesse a pasta backend:
cd backend
2- Abra o banco de dados no SQLite:
sqlite3 database.sqlite
4- Liste as tabelas disponíveis:
.tables
5- Consulte os clientes cadastrados:
SELECT * FROM users;
6- Consulte os agendamentos cadastrados:
SELECT * FROM appointments;
Para sair do SQLite, digite: .exit

🔹 Opção 2: Usar o DB Browser for SQLite (Interface Gráfica)
1- Baixe e instale o DB Browser for SQLite: Download Aqui
2- Abra o programa e clique em "Open Database" (Abrir Banco de Dados).
3- Selecione o arquivo database.sqlite que está na pasta backend.
4- Vá até a aba "Browse Data" (Navegar pelos Dados) para visualizar as tabelas e registros.
