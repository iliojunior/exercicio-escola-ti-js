String.prototype.isNullOrEmpty = function (needed) {
    needed = needed || false;
    if (needed)
        return (this === null || this.trim() === "");
    else
        return (this == null || this.trim() == "");
};

Object.prototype.cloneDistancias = function () {
    var retorno = [];
    for (var i = 0; i < this.length; i++) {
        retorno.push(this[i]);
    }
    return retorno;
}

Object.prototype.cloneCidade = function () {
    var retorno = [];
    for (var i = 0; i < this.length; i++) {
        var cidadeAtual = this[i];
        var addCidade = {
            nome: cidadeAtual.nome
        }
        for (var x = 0; x < cidadeAtual.distancias; x++) {
            addCidade.push(cidadeAtual.distancias[x]);
            /*addCidade.push(cidadeAtual.distancias.cloneDistancias());*/
        }
        retorno.push(addCidade);
    }
    return retorno;
}

Object.prototype.isEmpty = function () {
    return (this.length <= 0 || this.length === undefined);
}

function convertoToJson(value) {
    return JSON.stringify(value, null, 4);
}
Array.prototype.indexOfCidade = function (searchValue) {
    var index = 0;
    for (var i = 0; i < this.length; i++) {
        if (this[i].nome == searchValue)
            index = i;
    }
    return index;
}

Array.prototype.indexOfDistancia = function (searchValue) {
    var index = 0;
    for (var i = 0; i < this.length; i++) {
        if (this[i].cidade == searchValue)
            index = i;
    }
    return index;
}