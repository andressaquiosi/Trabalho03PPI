import express from "express";

const host = "0.0.0.0";
const porta = 3000;

// Lista para armazenar fornecedores em memória
var listaFornecedores = [];

const server = express();

// Configura o express para processar dados de formulários (POST)
server.use(express.urlencoded({ extended: true }));

/**
 * GERA O HTML DO MENU DE NAVEGAÇÃO
 * @returns string HTML do menu
 */
function gerarMenuHTML() {
    return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Meu App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownCadastros" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Cadastros
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownCadastros">
                            <li><a class="dropdown-item" href="/cadastrar-fornecedor">Cadastrar Fornecedor</a></li>
                            <!-- Adicionar outros cadastros aqui, ex: cliente -->
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/logout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    `;
}

/**
 * GERA A PÁGINA HTML COMPLETA (HEADER, BODY, ETC)
 * @param {string} titulo - Título da página
 * @param {string} conteudoBody - Conteúdo HTML principal da página
 * @returns string HTML completo da página
 */
function gerarPaginaHTML(titulo, conteudoBody) {
    return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${titulo}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        ${gerarMenuHTML()}
        <div class="container mt-5">
            ${conteudoBody}
        </div>
    </body>
    </html>
    `;
}

/**
 * GERA O HTML DO FORMULÁRIO DE CADASTRO DE FORNECEDOR
 * @param {object} dados - Dados do formulário para repopular (ex: req.body)
 * @param {object} erros - Objeto com mensagens de erro (ex: { cnpj: "CNPJ é obrigatório" })
 * @returns string HTML do formulário
 */
function gerarFormularioFornecedorHTML(dados = {}, erros = {}) {
    let html = `
    <h2 class="mb-4">Formulário de Cadastro de Fornecedor</h2>
    <form action="/cadastrar-fornecedor" method="POST">
        
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="cnpj" class="form-label">CNPJ:</label>
                <!-- Repopula o valor e exibe o erro se existir -->
                <input type="text" class="form-control ${erros.cnpj ? 'is-invalid' : ''}" id="cnpj" name="cnpj" value="${dados.cnpj || ''}">
                ${erros.cnpj ? `<div class="invalid-feedback">${erros.cnpj}</div>` : ''}
            </div>
            <div class="col-md-6 mb-3">
                <label for="razaoSocial" class="form-label">Razão Social:</label>
                <input type="text" class="form-control ${erros.razaoSocial ? 'is-invalid' : ''}" id="razaoSocial" name="razaoSocial" value="${dados.razaoSocial || ''}">
                ${erros.razaoSocial ? `<div class="invalid-feedback">${erros.razaoSocial}</div>` : ''}
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="nomeFantasia" class="form-label">Nome Fantasia:</label>
                <input type="text" class="form-control ${erros.nomeFantasia ? 'is-invalid' : ''}" id="nomeFantasia" name="nomeFantasia" value="${dados.nomeFantasia || ''}">
                ${erros.nomeFantasia ? `<div class="invalid-feedback">${erros.nomeFantasia}</div>` : ''}
            </div>
            <div class="col-md-6 mb-3">
                <label for="telefone" class="form-label">Telefone:</label>
                <input type="text" class="form-control ${erros.telefone ? 'is-invalid' : ''}" id="telefone" name="telefone" value="${dados.telefone || ''}">
                ${erros.telefone ? `<div class="invalid-feedback">${erros.telefone}</div>` : ''}
            </div>
        </div>

        <div class="mb-3">
            <label for="endereco" class="form-label">Endereço:</label>
            <input type="text" class="form-control ${erros.endereco ? 'is-invalid' : ''}" id="endereco" name="endereco" value="${dados.endereco || ''}">
            ${erros.endereco ? `<div class="invalid-feedback">${erros.endereco}</div>` : ''}
        </div>
        
        <div class="row">
            <div class="col-md-5 mb-3">
                <label for="cidade" class="form-label">Cidade:</label>
                <input type="text" class="form-control ${erros.cidade ? 'is-invalid' : ''}" id="cidade" name="cidade" value="${dados.cidade || ''}">
                ${erros.cidade ? `<div class="invalid-feedback">${erros.cidade}</div>` : ''}
            </div>
            <div class="col-md-3 mb-3">
                <label for="uf" class="form-label">UF:</label>
                <input type="text" class="form-control ${erros.uf ? 'is-invalid' : ''}" id="uf" name="uf" value="${dados.uf || ''}">
                ${erros.uf ? `<div class="invalid-feedback">${erros.uf}</div>` : ''}
            </div>
            <div class="col-md-4 mb-3">
                <label for="cep" class="form-label">CEP:</label>
                <input type="text" class="form-control ${erros.cep ? 'is-invalid' : ''}" id="cep" name="cep" value="${dados.cep || ''}">
                ${erros.cep ? `<div class="invalid-feedback">${erros.cep}</div>` : ''}
            </div>
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" class="form-control ${erros.email ? 'is-invalid' : ''}" id="email" name="email" value="${dados.email || ''}">
            ${erros.email ? `<div class="invalid-feedback">${erros.email}</div>` : ''}
        </div>
        
        <button type="submit" class="btn btn-primary">Cadastrar</button>
    </form>
    `;
    return html;
}

/**
 * GERA O HTML DA LISTA DE FORNECEDORES
 * @returns string HTML da tabela de fornecedores
 */
function gerarListaFornecedoresHTML() {
    let html = `
    <hr class="mt-5">
    <h3 class="mb-4">Fornecedores Cadastrados</h3>
    `;
    if (listaFornecedores.length > 0) {
        html += `
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th>CNPJ</th>
                            <th>Razão Social</th>
                            <th>Nome Fantasia</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>Cidade/UF</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        for (const fornecedor of listaFornecedores) {
            html += `
                <tr>
                    <td>${fornecedor.cnpj}</td>
                    <td>${fornecedor.razaoSocial}</td>
                    <td>${fornecedor.nomeFantasia}</td>
                    <td>${fornecedor.telefone}</td>
                    <td>${fornecedor.email}</td>
                    <td>${fornecedor.cidade}/${fornecedor.uf}</td>
                </tr>
            `;
        }
        html += `
                    </tbody>
                </table>
            </div>
        `;
    } else {
        html += '<p class="alert alert-info">Nenhum fornecedor cadastrado ainda.</p>';
    }
    return html;
}

// ----- ROTAS DA APLICAÇÃO -----

// Rota Principal (Home)
server.get("/", (requisicao, resposta) => {
    const conteudo = `
        <h1>Página Inicial</h1>
        <p>Bem-vindo ao sistema de gerenciamento.</p>
        <p>Use o menu acima para navegar.</p>
    `;
    resposta.send(gerarPaginaHTML("Página Inicial", conteudo));
});

// Rota para exibir o formulário de cadastro (GET)
server.get('/cadastrar-fornecedor', (requisicao, resposta) => {
    // Gera o formulário vazio + lista de fornecedores
    const formulario = gerarFormularioFornecedorHTML();
    const lista = gerarListaFornecedoresHTML();
    resposta.send(gerarPaginaHTML("Cadastro de Fornecedor", formulario + lista));
});

// Rota para processar o cadastro (POST)
server.post('/cadastrar-fornecedor', (requisicao, resposta) => {
    const { cnpj, razaoSocial, nomeFantasia, telefone, endereco, cidade, uf, cep, email } = requisicao.body;

    const erros = {};
    const dados = requisicao.body;

    // Validação campo a campo
    if (!cnpj) {
        erros.cnpj = "Por favor, informe o CNPJ";
    }
    if (!razaoSocial) {
        erros.razaoSocial = "Por favor, informe a Razão Social";
    }
    if (!nomeFantasia) {
        erros.nomeFantasia = "Por favor, informe o Nome Fantasia";
    }
    if (!telefone) {
        erros.telefone = "Por favor, informe o Telefone";
    }
    if (!endereco) {
        erros.endereco = "Por favor, informe o Endereço";
    }
    if (!cidade) {
        erros.cidade = "Por favor, informe a Cidade";
    }
    if (!uf) {
        erros.uf = "Por favor, informe o UF";
    }
    if (!cep) {
        erros.cep = "Por favor, informe o CEP";
    }
    if (!email) {
        erros.email = "Por favor, informe o Email";
    }

    // Verifica se há erros
    if (Object.keys(erros).length > 0) {
        // Se houver erros, exibe o formulário novamente com os erros e dados preenchidos
        const formulario = gerarFormularioFornecedorHTML(dados, erros);
        const lista = gerarListaFornecedoresHTML();
        resposta.send(gerarPaginaHTML("Cadastro de Fornecedor", formulario + lista));
    } else {
        // Se não houver erros, adiciona à lista e redireciona
        listaFornecedores.push({ cnpj, razaoSocial, nomeFantasia, telefone, endereco, cidade, uf, cep, email });
        console.log("Fornecedor cadastrado com sucesso!");
        // Redireciona de volta para a página de cadastro (que também exibe a lista)
        resposta.redirect('/cadastrar-fornecedor');
    }
});

// Rota de Login (GET) - Exibe o formulário
server.get('/login', (requisicao, resposta) => {
    const conteudo = `
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2 class="mb-4">Login</h2>
                <form action="/login" method="POST">
                    <div class="mb-3">
                        <label for="usuario" class="form-label">Usuário:</label>
                        <input type="text" class="form-control" id="usuario" name="usuario" required>
                    </div>
                    <div class="mb-3">
                        <label for="senha" class="form-label">Senha:</label>
                        <input type="password" class="form-control" id="senha" name="senha" required>
                    </div>
                    <button type="submit" class="btn btn-success">Entrar</button>
                </form>
            </div>
        </div>
    `;
    resposta.send(gerarPaginaHTML("Login", conteudo));
});

// Rota de Login (POST) - Processa o login (sem validação real)
server.post('/login', (requisicao, resposta) => {
    const { usuario, senha } = requisicao.body;

    let mensagem = "";
    
    // Validação simples (como solicitado)
    if (usuario === 'admin' && senha === '123') {
        mensagem = '<div class="alert alert-success mt-4">Login efetuado com sucesso!</div>';
    } else {
        mensagem = '<div class="alert alert-danger mt-4">Usuário ou senha inválidos.</div>';
    }

    // Recria o formulário e adiciona a mensagem
    const formularioLogin = `
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2 class="mb-4">Login</h2>
                <form action="/login" method="POST">
                    <div class="mb-3">
                        <label for="usuario" class="form-label">Usuário:</label>
                        <input type="text" class="form-control" id="usuario" name="usuario" value="${usuario || ''}" required>
                    </div>
                    <div class="mb-3">
                        <label for="senha" class="form-label">Senha:</label>
                        <input type="password" class="form-control" id="senha" name="senha" required>
                    </div>
                    <button type="submit" class="btn btn-success">Entrar</button>
                </form>
                ${mensagem}
            </div>
        </div>
    `;
    
    resposta.send(gerarPaginaHTML("Login", formularioLogin));
});

// Rota de Logout
server.get('/logout', (requisicao, resposta) => {
    const conteudo = `
        <div class="alert alert-info">
            Logout efetuado com sucesso!
        </div>
        <a href="/" class="btn btn-primary">Voltar para Home</a>
    `;
    resposta.send(gerarPaginaHTML("Logout", conteudo));
});


// Inicia o servidor
server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});