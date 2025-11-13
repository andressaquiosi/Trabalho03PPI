import express from "express";

const host = "0.0.0.0";
const porta = 3000;

var listausuarios = [];

const server = express();

server.use(express.urlencoded({ extended: true }));

server.get("/", (requisicao, resposta) => {
    let conteudoResposta = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cadastro de Alunos</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <h2 class="mb-4">Formulário de Cadastro de Aluno</h2>
            
            <form action="/adicionarusuario" method="POST">
                
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="nome" class="form-label">Nome Completo:</label>
                        <input type="text" class="form-control" id="nome" name="nome" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="email" name="email" required>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label for="data_nascimento" class="form-label">Data de Nascimento:</label>
                        <input type="date" class="form-control" id="data_nascimento" name="data_nascimento" required>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="cpf" class="form-label">CPF:</label>
                        <input type="text" class="form-control" id="cpf" name="cpf" placeholder="000.000.000-00" required>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="cidade" class="form-label">Cidade:</label>
                        <input type="text" class="form-control" id="cidade" name="cidade" required>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="matricula" class="form-label">Matrícula:</label>
                        <input type="text" class="form-control" id="matricula" name="matricula" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="curso" class="form-label">Curso:</label>
                        <input type="text" class="form-control" id="curso" name="curso" required>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary">Cadastrar</button>
            </form>
            <hr class="mt-5">

            <h3 class="mb-4">Alunos Cadastrados</h3>
    `;
    if (listausuarios.length > 0) {
        conteudoResposta += `
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Data Nasc.</th>
                            <th>CPF</th>
                            <th>Cidade</th>
                            <th>Matrícula</th>
                            <th>Curso</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        for (const aluno of listausuarios) {
            conteudoResposta += `
                <tr>
                    <td>${aluno.nome}</td>
                    <td>${aluno.email}</td>
                    <td>${aluno.data_nascimento}</td>
                    <td>${aluno.cpf}</td>
                    <td>${aluno.cidade}</td>
                    <td>${aluno.matricula}</td>
                    <td>${aluno.curso}</td>
                </tr>
            `;
        }
        conteudoResposta += `
                    </tbody>
                </table>
            </div>
        `;
    } else {
        conteudoResposta += '<p class="alert alert-info">Nenhum aluno cadastrado ainda.</p>';
    }
    conteudoResposta += `
        </div>
    </body>
    </html>
    `;
    resposta.send(conteudoResposta);
});
server.post('/adicionarusuario', (requisicao, resposta) => {
    const dados = requisicao.body;
    listausuarios.push(dados);
    console.log("Aluno cadastrado com sucesso!");
    console.log("Dados recebidos:", dados);
    resposta.redirect('/');
});
server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});