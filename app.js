const express = require('express');
const fun = require('./functions')
const server = express();
const port = 8000;

const layoutBase = `<!DOCTYPE html>
                        <html lang="en">

                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <link rel="stylesheet" href="style.css">
                            <title>minefield</title>
                        </head>

                        <body>
                            <header>
                                <h1>Minefield</h1>
                                <nav>
                                    <ul>
                                        <li><a href="/">Start</a></li>
                                        <li><a href="/author">Author</a></li>
                                    </ul>
                                </nav>
                            </header>`
let transparencia;
let arrayComBombasVerificadas;
let arraySemBombas = [];
let arrayComBombas;
let numeroDeBombas;
let linhas;
let colunas;
let clicks;

server.get('/', (req, res) => {
    let html = layoutBase;
    html += `
        <a href="/level"><button  class="butto-nPlay">Play!</button></a>
    </body></html>`
    res.send(html)
});
server.get('/author', (req, res) => {
    let html = layoutBase;
    html += `<div class="author">
                <h2>Ayrlon Vilarim</h2>
                <p>Phone : +55 (81) 99275-1174</p>
                <p>E-mail : ayr.l@hotmail.com</p>
                <p>Instagram : @ayrlon</p>
            </div>`
    res.send(html)
})

server.get('/level', (req, res) => {
    let html = layoutBase;
    html += `<div class="level"> 
                <ul class="level">
                    <a href="/game?lin=9&col=9&bombas=10"><li>Easy</li></a>
                    <a href="/game?lin=16&col=16&bombas=40"><li>Average</li></a>
                    <a href="/game?lin=16&col=30&bombas=100"><li>Hard</li></a>
                </ul>
            </div>
            </body>
            </html>`

    res.send(html)
})

server.get('/game', (req, res) => {
    let html = layoutBase;
    clicks = 0;
    numeroDeBombas = req.query.bombas;
    linhas = req.query.lin;
    colunas = req.query.col;

    arraySemBombas = fun.criarArray(linhas, colunas);

    arrayComBombas = fun.implementarBombasNoArray(arraySemBombas, numeroDeBombas);

    console.log(arrayComBombas)
    arrayComBombasVerificadas = fun.verificarLocalBombas(arrayComBombas);

    transparencia = fun.criarTransparencia(linhas, colunas);

    html += fun.criarTabela(linhas, colunas, transparencia, arrayComBombasVerificadas);

    html += `</body></html>`;
    res.send(html);
});

server.get('/gaming', (req, res) => {
    let html = layoutBase;
    let lin = req.query.linha;
    let col = req.query.coluna;

    if (transparencia[lin][col] == -1) {
        transparencia[lin][col] = -2;
        clicks++
    }
    if (((colunas * linhas) - numeroDeBombas) == clicks) {
        res.redirect('/victory');
    }

    let clicouEmBomba = fun.verificarSeTemBomba(transparencia, arrayComBombasVerificadas);

    html += fun.criarTabela(linhas, colunas, transparencia, arrayComBombasVerificadas);

    html += `</body></html>`;


    if (clicouEmBomba) {
        res.redirect('/lose1');
    } else {
        res.send(html);
    }
});

server.get('/lose1', (req, res) => {
    let html = `<!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <meta http-equiv="Refresh" content="2; url='/lose'" />
                            <link rel="stylesheet" href="style.css"> 
                            <title>minefield</title>
                        </head>
                        <body>
                            <header>
                                <h1>Minefield</h1>
                                <nav>
                                    <ul>
                                        <li><a href="/">Start</a></li>
                                    </ul>
                                </nav>
                            </header>`

    fun.zerarTansparencia(transparencia)

    html += fun.criarTabela(linhas, colunas, transparencia, arrayComBombasVerificadas);

    html += `</body></html>`;

    res.send(html);
});

server.get('/lose', (req, res) => {
    let html = layoutBase;
    html += `<div class="wrapper-lose">
                <div class="lose"><h2>You exploded!</h2></div>
                <a href="/level"><button>Play Again?</button></a>
            </div>
            </body></html>`
    res.send(html)
});

server.get('/victory', (req, res) => {
    let html = layoutBase;
    html += `<div class="victory">
                <div class="wrapper-lose">
                <h2> You won! </h2>
                <a href="/level"><button>Play Again?</button></a>
            </div>
            </div>`;

    res.send(html);
});

server.use(express.static('public'));

server.listen(port, () => {
    console.log(`server ir running in port: ${port}`)
});