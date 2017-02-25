const OPCAO_SAIR = "!SAIR";
minhasCidades = [];

iniciarAplicacao();

function iniciarAplicacao() {
    var nomeNovaCidade;

    do {

        var mensagemNovaCidade = "Digite o nome da nova cidade:" +
            "\r\nPara sair digite \"!SAIR\"";

        nomeNovaCidade = prompt(mensagemNovaCidade);

        var isSair = (nomeNovaCidade === OPCAO_SAIR || nomeNovaCidade === null);

        if (!isSair && !nomeNovaCidade.isNullOrEmpty()) {
            adicionarCidade(nomeNovaCidade);
        }

    } while (!isSair);

    //Exibe o vetor de cidades (Mapa) no console
    minhasCidades.print();
}

function criarDistancia(nomeCidade, distancia) {
    return {cidade: nomeCidade, distancia: distancia};
}

function criarCidade(nomeCidade, distancias) {
    distancias = distancias || [];
    var novaCidade = {
        nome: nomeCidade,
        distancias: []
    };
    if (!distancias.isEmpty())
        novaCidade.distancias.push(distancias);
    return novaCidade;
}

function percorrerCidadePerguntandoDistancia(novaCidadeNome) {
    var cidadeParaPerguntar = minhasCidades.cloneCidade();

    if (cidadeParaPerguntar.isEmpty()) {
        var novaCidade = criarCidade(novaCidadeNome);

        minhasCidades.push(novaCidade);
        return;
    }

    var distancias = [];
    var novaCidade = criarCidade(novaCidadeNome);
    for (var i = 0; !cidadeParaPerguntar.isEmpty(); i++) {
        var cidadeAtualParaPerguntar = cidadeParaPerguntar[0];
        var distancia = 0;
        var entradaUsuario = prompt("Digite a distancia de \"" + novaCidadeNome + "\" para \"" + cidadeAtualParaPerguntar.nome + "\".");

        //Entra em um laço enquanto o usuario não digitar a distancia em numero
        while (parseFloat(entradaUsuario) === NaN) {
            entradaUsuario = prompt("Digite uma distancia valida de \"" + novaCidadeNome + "\" para \"" + cidadeAtualParaPerguntar.nome + "\".");
        }

        //Converte a entrada do usuario em um numero
        distancia = parseFloat(entradaUsuario);

        //Cria distancia desta cidade para outra cidade
        var distanciaDestaParaOutraCidade = criarDistancia(cidadeAtualParaPerguntar.nome, distancia);

        //Cria distancia da outra cidade para esta cidade
        var distanciaDaOutraParaEstaCidade = criarDistancia(novaCidadeNome, distancia);

        //Altera a distancia da outra cidade para esta
        minhasCidades[i].distancias.push(distanciaDaOutraParaEstaCidade);

        //Adiciona uma nova distancia na nova Cidade
        novaCidade.distancias.push(distanciaDestaParaOutraCidade);

        //Remove da fila
        cidadeParaPerguntar.shift();
    }

    //Adiciona a nova cidade no mapa
    minhasCidades.push(novaCidade);
}

function adicionarCidade(nomeDaCidade) {
    percorrerCidadePerguntandoDistancia(nomeDaCidade);
}

