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
                } else {
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
        let arrayComBombas = array;

        while (contadorBombas < numeroBombas) {
            const linha = Math.floor(Math.random() * array.length);
            const coluna = Math.floor(Math.random() * array[0].length)

            if (arrayComBombas[linha][coluna] != 9) {
                arrayComBombas[linha][coluna] = 9;
                contadorBombas++
            }
        }
        return arrayComBombas
    },

    verificarLocalBombas: (array) => {
        let arrayComBombas = array;

        for (let i = 0; i < arrayComBombas.length; i++) {
            for (let j = 0; j < arrayComBombas[i].length; j++) {

                let contadorBombasAoRedor = 0;

                const linhaAnterior = i - 1;
                const linhaPosterior = i + 1;

                const colunaAnterior = j - 1;
                const colunaPosterior = j + 1;

                if (arrayComBombas[i][j] != 9) {

                    if (linhaAnterior != -1
                        && colunaAnterior != -1
                        && arrayComBombas[linhaAnterior][colunaAnterior] == 9) {

                        contadorBombasAoRedor++
                    }
                    if (linhaAnterior != -1
                        && arrayComBombas[linhaAnterior][j] == 9) {

                        contadorBombasAoRedor++
                    }
                    if (linhaAnterior != -1
                        && colunaPosterior != array[i].length
                        && arrayComBombas[linhaAnterior][colunaPosterior] == 9) {
                        contadorBombasAoRedor++
                    }
                    if (colunaAnterior != -1
                        && arrayComBombas[i][colunaAnterior] == 9) {
                        contadorBombasAoRedor++
                    }
                    if (colunaPosterior != array[i].length
                        && arrayComBombas[i][colunaPosterior] == 9) {

                        contadorBombasAoRedor++
                    }
                    if (linhaPosterior != array.length
                        && colunaPosterior != array[i].length
                        && arrayComBombas[linhaPosterior][colunaAnterior] == 9) {

                        contadorBombasAoRedor++
                    }
                    if (linhaPosterior != array.length
                        && arrayComBombas[linhaPosterior][j] == 9) {

                        contadorBombasAoRedor++
                    }
                    if (linhaPosterior != array.length
                        && colunaPosterior != array[i].length
                        && arrayComBombas[linhaPosterior][colunaPosterior] == 9) {
                        contadorBombasAoRedor++
                    }
                    arrayComBombas[i][j] = contadorBombasAoRedor

                }

            }
        }
        return arrayComBombas
    },

    verificarSeTemBomba: (arrayTransparencia, arrayDeBombas) => {

        for (let i = 0; i < arrayTransparencia.length; i++) {

            for (let j = 0; j < arrayTransparencia[i].length; j++) {

                if (arrayTransparencia[i][j] == -2) {
                    if (arrayDeBombas[i][j] == 9) {
                        return true
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
    }
}


