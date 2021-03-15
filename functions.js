module.exports = {
    criarTabela: (linhas, colunas, transparencia, bombas) => {
        let tabela = `<div class="tabela-jogo"><table>`;

        for (let i = 0; i < linhas; i++) {
            tabela += `<tr>`

            for (let j = 0; j < colunas; j++) {
                if (transparencia[i][j] == -1) {

                    tabela += `<td><a href="/gaming?linha=${i}&coluna=${j}"><div class="campo"></div></a></td>`
                }
                else if (bombas[i][j] == 9) {
                    tabela += `<td><img class="img-bomba" src="images/bomb.svg"></td>`
                }
                else if (bombas[i][j] == 0) {
                    tabela += `<td class="campo-sem-mina"></td>`
                }
                else {
                    tabela += `<td class="campo-sem-mina">${bombas[i][j]}</td>`
                }
            }
        }
        tabela += `</table></div>`
        return tabela
    },

    criarTransparencia: (linhas, colunas) => {
        let arrayTransparencia = [];

        for (let i = 0; i < linhas; i++) {
            arrayTransparencia.push([]);
            for (let j = 0; j < colunas; j++) {
                arrayTransparencia[i].push(-1)
            }
        }
        return arrayTransparencia
    },

    criarArray: (linhas, colunas) => {
        let array = [];
        for (let i = 0; i < linhas; i++) {
            array.push([]);
            for (let j = 0; j < colunas; j++) {
                array[i].push(0)
            }
        }
        return array
    },

    implementarBombasNoArray: (array, numeroBombas) => {
        let contadorBombas = 0;

        while (contadorBombas < numeroBombas) {
            const linha = Math.floor(Math.random() * array.length);
            const coluna = Math.floor(Math.random() * array[0].length)

            if (array[linha][coluna] != 9) {
                array[linha][coluna] = 9;
                contadorBombas++
            }
        }
    },

    verificarLocalBombas: (array) => {

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {

                let contadorBombasAoRedor = 0;

                const linhaAnterior = i - 1;
                const linhaPosterior = i + 1;

                const colunaAnterior = j - 1;
                const colunaPosterior = j + 1;

                if (array[i][j] != 9) {

                    if (linhaAnterior != -1
                        && colunaAnterior != -1
                        && array[linhaAnterior][colunaAnterior] == 9) {

                        contadorBombasAoRedor++
                    }
                    if (linhaAnterior != -1
                        && array[linhaAnterior][j] == 9) {

                        contadorBombasAoRedor++
                    }
                    if (linhaAnterior != -1
                        && colunaPosterior != array[i].length
                        && array[linhaAnterior][colunaPosterior] == 9) {
                        contadorBombasAoRedor++
                    }
                    if (colunaAnterior != -1
                        && array[i][colunaAnterior] == 9) {
                        contadorBombasAoRedor++
                    }
                    if (colunaPosterior != array[i].length
                        && array[i][colunaPosterior] == 9) {

                        contadorBombasAoRedor++
                    }
                    if (linhaPosterior != array.length
                        && colunaPosterior != array[i].length
                        && array[linhaPosterior][colunaAnterior] == 9) {

                        contadorBombasAoRedor++
                    }
                    if (linhaPosterior != array.length
                        && array[linhaPosterior][j] == 9) {

                        contadorBombasAoRedor++
                    }
                    if (linhaPosterior != array.length
                        && colunaPosterior != array[i].length
                        && array[linhaPosterior][colunaPosterior] == 9) {
                        contadorBombasAoRedor++
                    }
                    array[i][j] = contadorBombasAoRedor
                }

            }
        }
    },

    verificarSeTemBomba: (arrayTransparencia, arrayDeBombas) => {

        for (let i = 0; i < arrayTransparencia.length; i++) {

            for (let j = 0; j < arrayTransparencia[i].length; j++) {

                if (arrayTransparencia[i][j] == -2) {
                    if (arrayDeBombas[i][j] == 9) {
                        return true
                    }
                    if (arrayDeBombas[i][j] == 0) {
                        const linhaAnterior = i - 1;
                        const linhaPosterior = i + 1;

                        const colunaAnterior = j - 1;
                        const colunaPosterior = j + 1;

                        if (linhaAnterior != -1 && colunaAnterior != -1) {
                            arrayTransparencia[linhaAnterior][colunaAnterior] = -2
                        }
                        if (linhaAnterior != -1) {
                            arrayTransparencia[linhaAnterior][j] = -2
                        }
                        if (linhaAnterior != -1 && colunaPosterior != arrayDeBombas[i].length) {
                            arrayTransparencia[linhaAnterior][colunaPosterior] = -2
                        }
                        if (colunaAnterior != -1) {
                            arrayTransparencia[i][colunaAnterior] = -2
                        }
                        if (colunaPosterior != arrayDeBombas[i].length) {
                            arrayTransparencia[i][colunaPosterior] = -2
                        }
                        if (linhaPosterior != arrayDeBombas.length && colunaPosterior != arrayDeBombas[i].length) {
                            arrayTransparencia[linhaPosterior][colunaAnterior] = -2
                        }
                        if (linhaPosterior != arrayDeBombas.length) {
                            arrayTransparencia[linhaPosterior][j] = -2
                        }
                        if (linhaPosterior != arrayDeBombas.length && colunaPosterior != arrayDeBombas[i].length) {
                            arrayTransparencia[linhaPosterior][colunaPosterior] = -2
                        }
                    }
                }
            }
        } return false
    },

    zerarTansparencia: (array) => {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                array[i][j] = 0
            }
        }
    },

    abrirCamposSemMina: (array, i, j) => {

        const linhaAnterior = i - 1;
        const linhaPosterior = i + 1;

        const colunaAnterior = j - 1;
        const colunaPosterior = j + 1;

        if (linhaAnterior != -1 && colunaAnterior != -1) {
            arrayComBombas[linhaAnterior][colunaAnterior] = 'campoSafe'
        }
        if (linhaAnterior != -1) {
            arrayComBombas[linhaAnterior][j] = 'campoSafe'
        }
        if (linhaAnterior != -1 && colunaPosterior != array[i].length) {
            arrayComBombas[linhaAnterior][colunaPosterior] = 'campoSafe'
        }
        if (colunaAnterior != -1) {
            arrayComBombas[i][colunaAnterior] = 'campoSafe'
        }
        if (colunaPosterior != array[i].length) {
            arrayComBombas[i][colunaPosterior] = 'campoSafe'
        }
        if (linhaPosterior != array.length && colunaPosterior != array[i].length) {
            arrayComBombas[linhaPosterior][colunaAnterior] = 'campoSafe'
        }
        if (linhaPosterior != array.length) {
            arrayComBombas[linhaPosterior][j] = 'campoSafe'
        }
        if (linhaPosterior != array.length && colunaPosterior != array[i].length) {
            arrayComBombas[linhaPosterior][colunaPosterior] = 'campoSafe'
        }
    },

    venceu: (array, linhas, colunas, numeroBombas) => {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                if (array[i][j] == -2) {
                    count++
                }
            }
        }
        return ((linhas * colunas) - count) <= numeroBombas ? true : false
    }
}


