/**
 * Constante da opcao de sair
 * @type {string}
 */
const OPCAO_SAIR = "!SAIR";

/**
 * Constante da opcao de saber a distancia
 * @type {string}
 */
const OPCAO_DISTANCIA = "!DISTANCIA";

/**
 * Array geral(mapa), com as cidades cadastradas pelo usuario
 * @type {Array}
 */
minhasCidades = [];

/**
 * Mostra a distancia entre duas cidades
 * @param {string} cidadeOrigem - Nome da Cidade de Origem informada pelo usuario
 * @param {string} cidadeDestino - Nome da Cidade de Destino informada pelo usuario
 * @returns {void}
 */
function mostrarDistancia(cidadeOrigem, cidadeDestino) {
    var indexCidade = minhasCidades.indexOfCidade(cidadeOrigem);
    var indexDistancia = minhasCidades[indexCidade].distancias.indexOfDistancia(cidadeDestino);
    var distancia = minhasCidades[indexCidade].distancias[indexDistancia].distancia;
    var mensagem = "A distancia de \"" + cidadeOrigem + "\" para \"" + cidadeDestino + "\" é: " + distancia;
    alert(mensagem);
}

/**
 * Pergunta as cidades de origem e de Destino para exibir
 * @returns {void}
 */
function calcularDistancia() {
    //Pede a Cidade de Origem
    var cidadeOrigem = prompt("Digite a cidade de origem");

    //Pede a Cidade de Destino
    var cidadeDestino = prompt("Digite a cidade de destino");

    //Exibe ao usuario a distancia entre as cidades informadas
    mostrarDistancia(cidadeOrigem, cidadeDestino);
}

/**
 * Funcao inicial da aplicacao
 * Permanece nela enquanto o usuario desejar utilizar a aplicacao
 * @returns {void}
 */
function iniciarAplicacao() {
    var nomeNovaCidade;

    do {

        var mensagemNovaCidade = "Digite o nome da nova cidade:" +
            "\r\nPara sair digite \"!SAIR\"" +
            "\r\nPara ver as distancias digite \"!DISTANCIA\"";

        nomeNovaCidade = prompt(mensagemNovaCidade);

        var isSair = (nomeNovaCidade === OPCAO_SAIR || nomeNovaCidade === null);

        if (nomeNovaCidade == OPCAO_DISTANCIA)
            calcularDistancia();

        var isAdicionar = (!isSair && nomeNovaCidade !== OPCAO_DISTANCIA && !nomeNovaCidade.isNullOrEmpty());

        if (isAdicionar) {
            adicionarCidade(nomeNovaCidade);
        }


    } while (!isSair);

    //Exibe o vetor de cidades (Mapa) no console
    console.log(convertoToJson(minhasCidades));
}

/**
 * Cria as distancias da cidade cadastrada para as demais cidades.
 * @param {string} nomeCidade
 * @param {number} distancia
 * @returns {{cidade: string, distancia: number}}
 */
function criarDistancia(nomeCidade, distancia) {
    return {cidade: nomeCidade, distancia: distancia};
}

/**
 * Cria uma nova cidade solicitada pelo usuario
 * @param {string} nomeCidade - Recebe o nome da cidade para criar
 * @param {array} distancias - Recebe distancias para cadastrar nesta cidade, caso nao seja informada o padrao eh []
 * @returns {{nome: string, distancias: Array}}
 */
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

/**
 * Adiciona uma nova cidade ao mapa.
 * Pede ao usuario para informar a distancia da nova cidade para as demais
 * @param {string} novaCidadeNome -> Nome da nova cidade
 * @returns {void}
 */
function adicionarCidade(novaCidadeNome) {
    /**
     * Clona o mapa global para uma variavel local
     */
    var cidadeParaPerguntar = minhasCidades.cloneCidade();

    /**
     * Cria a nova cidade
     * @type {{nome: string, distancias: Array}}
     */
    var novaCidade = criarCidade(novaCidadeNome);

    /**
     * Instancia da cidade caso o mapa esteja vazio
     */
    if (cidadeParaPerguntar.isEmpty()) {
        minhasCidades.push(novaCidade);
    }

    /**
     * Perguntar as distancias da nova cidade para as demais
     */
    for (var i = 0; !cidadeParaPerguntar.isEmpty(); i++) {
        /**
         * @type {number} - Distancia entre a nova cidade e as demais cidades
         */
        var distancia = 0;

        /**
         * @type {array} - Pilha de cidades para perguntas as distancias
         */
        var cidadeAtualParaPerguntar = cidadeParaPerguntar[0];

        /**
         * Entra em um laço enquanto o usuario não digitar a distancia em numero
         */
        do {
            var entradaUsuario = prompt("Digite uma distancia valida de \"" + novaCidadeNome + "\" para \"" + cidadeAtualParaPerguntar.nome + "\".");
        } while (parseFloat(entradaUsuario) == NaN);

        /**
         * @type {Number} Converte a entrada do usuario em um numero
         */
        distancia = parseFloat(entradaUsuario);

        /**
         * @type {{cidade: string, distancia: number}} Cria distancia desta cidade para outra cidade
         */
        var distanciaDestaParaOutraCidade = criarDistancia(cidadeAtualParaPerguntar.nome, distancia);


        /**
         * @type {{cidade: string, distancia: number}} - Cria distancia da outra cidade para esta cidade
         */
        var distanciaDaOutraParaEstaCidade = criarDistancia(novaCidadeNome, distancia);

        /**
         * Altera a distancia da outra cidade para esta
         */
        minhasCidades[i].distancias.push(distanciaDaOutraParaEstaCidade);

        /**
         * Adiciona uma nova distancia na nova Cidade
         */
        novaCidade.distancias.push(distanciaDestaParaOutraCidade);

        /**
         * Remove da fila
         */
        cidadeParaPerguntar.shift();
    }

    /**
     * Adiciona a nova cidade no mapa
     */
    minhasCidades.push(novaCidade);
}

/**
 * Inicia a aplicacao
 */
iniciarAplicacao();
