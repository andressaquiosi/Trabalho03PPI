import express from "express";

const host = "0.0.0.0";
const porta = 3000;

var listaFornecedores = [];

const server = express();

server.use(express.urlencoded({ extended: true }));

// Rota Principal (Home)
server.get("/", (requisicao, resposta) => {
    let conteudo = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sistema de Gerenciamento</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Meu App</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                Cadastros
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/cadastrar-fornecedor">Cadastrar Fornecedor</a></li>
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
        <div class="container mt-5">
            <h1>Página Inicial</h1>
            <p>Bem-vindo ao sistema de gerenciamento.</p>
            <p>Use o menu acima para navegar.</p>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    `;
    resposta.send(conteudo);
});

// Rota GET para exibir o formulário de cadastro de fornecedor
server.get("/cadastrar-fornecedor", (requisicao, resposta) => {
    let conteudo = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cadastro de Fornecedor</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Meu App</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                Cadastros
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/cadastrar-fornecedor">Cadastrar Fornecedor</a></li>
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
        <div class="container mt-5">
            <h2 class="mb-4">Formulário de Cadastro de Fornecedor</h2>
            
            <form action="/cadastrar-fornecedor" method="POST">
                
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="cnpj" class="form-label">CNPJ:</label>
                        <input type="text" class="form-control" id="cnpj" name="cnpj" value="">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="razaoSocial" class="form-label">Razão Social:</label>
                        <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" value="">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="nomeFantasia" class="form-label">Nome Fantasia:</label>
                        <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" value="">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="telefone" class="form-label">Telefone:</label>
                        <input type="text" class="form-control" id="telefone" name="telefone" value="">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="endereco" class="form-label">Endereço:</label>
                    <input type="text" class="form-control" id="endereco" name="endereco" value="">
                </div>
                
                <div class="row">
                    <div class="col-md-5 mb-3">
                        <label for="cidade" class="form-label">Cidade:</label>
                        <input type="text" class="form-control" id="cidade" name="cidade" value="">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="uf" class="form-label">UF:</label>
                        <input type="text" class="form-control" id="uf" name="uf" value="">
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="cep" class="form-label">CEP:</label>
                        <input type="text" class="form-control" id="cep" name="cep" value="">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Email:</label>
                    <input type="email" class="form-control" id="email" name="email" value="">
                </div>
                
                <button type="submit" class="btn btn-primary">Cadastrar</button>
            </form>
            <hr class="mt-5">

            <h3 class="mb-4">Fornecedores Cadastrados</h3>
    `;
    
    if (listaFornecedores.length > 0) {
        conteudo += `
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
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
            conteudo += `
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
        conteudo += `
                    </tbody>
                </table>
            </div>
        `;
    } else {
        conteudo += '<p class="alert alert-info">Nenhum fornecedor cadastrado ainda.</p>';
    }
    
    conteudo += `
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    `;
    resposta.send(conteudo);
});

// Rota POST para processar o cadastro de fornecedor
server.post('/cadastrar-fornecedor', (requisicao, resposta) => {
    const { cnpj, razaoSocial, nomeFantasia, telefone, endereco, cidade, uf, cep, email } = requisicao.body;

    if (cnpj && razaoSocial && nomeFantasia && telefone && endereco && cidade && uf && cep && email) {
        listaFornecedores.push({ cnpj, razaoSocial, nomeFantasia, telefone, endereco, cidade, uf, cep, email });
        console.log("Fornecedor cadastrado com sucesso!");
        resposta.redirect('/cadastrar-fornecedor');
    } else {
        let conteudo = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Fornecedor</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Meu App</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/">Home</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                    Cadastros
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/cadastrar-fornecedor">Cadastrar Fornecedor</a></li>
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
            <div class="container mt-5">
                <h2 class="mb-4">Formulário de Cadastro de Fornecedor</h2>
                
                <form action="/cadastrar-fornecedor" method="POST">
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="cnpj" class="form-label">CNPJ:</label>
                            <input type="text" class="form-control" id="cnpj" name="cnpj" value="${cnpj || ''}">
        `;
        
        if (!cnpj) {
            conteudo += `
                            <div>
                                <p class="text-danger">Por favor, informe o CNPJ</p>
                            </div>
            `;
        }
        
        conteudo += `
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="razaoSocial" class="form-label">Razão Social:</label>
                            <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" value="${razaoSocial || ''}">
        `;
        
        if (!razaoSocial) {
            conteudo += `
                            <div>
                                <p class="text-danger">Por favor, informe a Razão Social</p>
                            </div>
            `;
        }
        
        conteudo += `
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="nomeFantasia" class="form-label">Nome Fantasia:</label>
                            <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" value="${nomeFantasia || ''}">
        `;
        
        if (!nomeFantasia) {
            conteudo += `
                            <div>
                                <p class="text-danger">Por favor, informe o Nome Fantasia</p>
                            </div>
            `;
        }
        
        conteudo += `
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="telefone" class="form-label">Telefone:</label>
                            <input type="text" class="form-control" id="telefone" name="telefone" value="${telefone || ''}">
        `;
        
        if (!telefone) {
            conteudo += `
                            <div>
                                <p class="text-danger">Por favor, informe o Telefone</p>
                            </div>
            `;
        }
        
        conteudo += `
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="endereco" class="form-label">Endereço:</label>
                        <input type="text" class="form-control" id="endereco" name="endereco" value="${endereco || ''}">
        `;
        
        if (!endereco) {
            conteudo += `
                        <div>
                            <p class="text-danger">Por favor, informe o Endereço</p>
                        </div>
            `;
        }
        
        conteudo += `
                    </div>
                    
                    <div class="row">
                        <div class="col-md-5 mb-3">
                            <label for="cidade" class="form-label">Cidade:</label>
                            <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade || ''}">
        `;
        
        if (!cidade) {
            conteudo += `
                            <div>
                                <p class="text-danger">Por favor, informe a Cidade</p>
                            </div>
            `;
        }
        
        conteudo += `
                        </div>
                        <div class="col-md-3 mb-3">
                            <label for="uf" class="form-label">UF:</label>
                            <input type="text" class="form-control" id="uf" name="uf" value="${uf || ''}">
        `;
        
        if (!uf) {
            conteudo += `
                            <div>
                                <p class="text-danger">Por favor, informe o UF</p>
                            </div>
            `;
        }
        
        conteudo += `
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="cep" class="form-label">CEP:</label>
                            <input type="text" class="form-control" id="cep" name="cep" value="${cep || ''}">
        `;
        
        if (!cep) {
            conteudo += `
                            <div>
                                <p class="text-danger">Por favor, informe o CEP</p>
                            </div>
            `;
        }
        
        conteudo += `
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="email" name="email" value="${email || ''}">
        `;
        
        if (!email) {
            conteudo += `
                        <div>
                            <p class="text-danger">Por favor, informe o Email</p>
                        </div>
            `;
        }
        
        conteudo += `
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Cadastrar</button>
                </form>
                <hr class="mt-5">

                <h3 class="mb-4">Fornecedores Cadastrados</h3>
        `;
        
        if (listaFornecedores.length > 0) {
            conteudo += `
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead>
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
                conteudo += `
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
            conteudo += `
                        </tbody>
                    </table>
                </div>
            `;
        } else {
            conteudo += '<p class="alert alert-info">Nenhum fornecedor cadastrado ainda.</p>';
        }
        
        conteudo += `
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
        `;
        
        resposta.send(conteudo);
    }
});

// Rota GET de Login
server.get('/login', (requisicao, resposta) => {
    let conteudo = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Meu App</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                Cadastros
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/cadastrar-fornecedor">Cadastrar Fornecedor</a></li>
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
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h2 class="mb-4">Login</h2>
                    <form action="/login" method="POST">
                        <div class="mb-3">
                            <label for="usuario" class="form-label">Usuário:</label>
                            <input type="text" class="form-control" id="usuario" name="usuario" value="">
                        </div>
                        <div class="mb-3">
                            <label for="senha" class="form-label">Senha:</label>
                            <input type="password" class="form-control" id="senha" name="senha">
                        </div>
                        <button type="submit" class="btn btn-success">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    `;
    resposta.send(conteudo);
});

// Rota POST de Login
server.post('/login', (requisicao, resposta) => {
    const { usuario, senha } = requisicao.body;
    
    let conteudo = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Meu App</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                Cadastros
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/cadastrar-fornecedor">Cadastrar Fornecedor</a></li>
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
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h2 class="mb-4">Login</h2>
                    <form action="/login" method="POST">
                        <div class="mb-3">
                            <label for="usuario" class="form-label">Usuário:</label>
                            <input type="text" class="form-control" id="usuario" name="usuario" value="${usuario || ''}">
                        </div>
                        <div class="mb-3">
                            <label for="senha" class="form-label">Senha:</label>
                            <input type="password" class="form-control" id="senha" name="senha">
                        </div>
                        <button type="submit" class="btn btn-success">Entrar</button>
                    </form>
    `;
    
    if (usuario === 'admin' && senha === '123') {
        conteudo += '<div class="alert alert-success mt-4">Login efetuado com sucesso!</div>';
    } else {
        conteudo += '<div class="alert alert-danger mt-4">Usuário ou senha inválidos.</div>';
    }
    
    conteudo += `
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    `;
    
    resposta.send(conteudo);
});

// Rota de Logout
server.get('/logout', (requisicao, resposta) => {
    let conteudo = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Logout</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Meu App</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                Cadastros
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/cadastrar-fornecedor">Cadastrar Fornecedor</a></li>
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
        <div class="container mt-5">
            <div class="alert alert-info">
                Logout efetuado com sucesso!
            </div>
            <a href="/" class="btn btn-primary">Voltar para Home</a>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    `;
    resposta.send(conteudo);
});

server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});