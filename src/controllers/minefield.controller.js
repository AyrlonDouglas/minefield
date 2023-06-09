
class MinefieldController {
    constructor(LogicGame){
        this.logicGame = new LogicGame()

    }
    layoutBase = `<!DOCTYPE html>
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
     transparencia;
     campoMinado = [];
     numeroDeBombas;
     linhas;
     colunas;
     logicGame;

     index(req,res){
        let html = this.layoutBase;
        html += `
            <a href="/level"><button  class="butto-nPlay">Play!</button></a>
        </body></html>`
        res.send(html)
     }

     author(req,res){
        let html = this.layoutBase;
        html += `<div class="author">
                    <h2>Ayrlon Vilarim</h2>
                    <p>Phone : +55 (81) 99275-1174</p>
                    <p>E-mail : ayr.l@hotmail.com</p>
                    <p>Instagram : @ayrlon</p>
                </div>`
        res.send(html)
     }

     level (req, res)  {
        let html = this.layoutBase;
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
    }

    game(req, res)  {
        let html = this.layoutBase;
        this.numeroDeBombas = req.query.bombas;
        this.linhas = req.query.lin;
        this.colunas = req.query.col;
        this.campoMinado = this.logicGame.criarArray(this.linhas, this.colunas);
        this.transparencia = this.logicGame.criarTransparencia(this.linhas, this.colunas);
    
        this.logicGame.implementarBombasNoArray(this.campoMinado, this.numeroDeBombas);
        this.logicGame.verificarLocalBombas(this.campoMinado);
    
        html += this.logicGame.criarTabela(this.linhas, this.colunas, this.transparencia, this.campoMinado);
        html += `</body></html>`;
    
        res.send(html);
    }

    gaming (req, res)  {
        let html = this.layoutBase;
        const lin = req.query.linha;
        const col = req.query.coluna;
        if (this.transparencia[lin][col] == -1) {
            this.transparencia[lin][col] = -2;
        }
    
        const venceu = this.logicGame.venceu(this.transparencia, this.linhas, this.colunas, this.numeroDeBombas);
        const perdeu = this.logicGame.verificarSeTemBomba(this.transparencia, this.campoMinado);
    
        html += this.logicGame.criarTabela(this.linhas, this.colunas, this.transparencia, this.campoMinado);
    
        html += `</body></html>`;
    
        if (venceu) {
            res.redirect('/victory');
        }
        else if (perdeu) {
            res.redirect('/exploded');
        } else {
            res.send(html);
        }
    }

    exploded (req, res)  {
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
                                            <li><a href="/author">Author</a></li>
                                        </ul>
                                    </nav>
                                </header>`
    
        this.logicGame.zerarTansparencia(this.transparencia)
    
        html += this.logicGame.criarTabela(this.linhas, this.colunas, this.transparencia, this.campoMinado);
    
        html += `</body></html>`;
    
        res.send(html);
    }

    lose (req, res)  {
        let html = this.layoutBase;
        html += `<div class="wrapper-lose">
                    <div class="lose"><h2>You exploded!</h2></div>
                    <a href="/level"><button>Play Again?</button></a>
                </div>
                </body></html>`
        res.send(html)
    }

    victory (req, res) {
        let html = this.layoutBase;
        html += `<div class="victory">
                    <div class="wrapper-lose">
                    <h2> You won! </h2>
                    <a href="/level"><button>Play Again?</button></a>
                </div>
                </div>`;
    
        res.send(html);
    };


}

module.exports =  MinefieldController