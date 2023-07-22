//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90


//variáveis da raquete 
let xRaquete = 5;
let yRaquete = 150;


//sons do jogo
let raquetada;
let ponto;
let trilha;


//variáveis do oponente
let xRaqueteOponente =580;
let yRaqueteOponente =150;
let velocidadeYOponente=20;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//variavel de erro
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound('trilha.mp3');
  ponto = loadSound('ponto.mp3');
  raquetada = loadSound('raquetada.mp3');
  }


function setup() {
  createCanvas(600, 400);
  trilha.play();
  ponto.play();
  raquetada.play();
}

function draw() {
  background(255,0,0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete , yRaquete);
  //verificaColisaoRaquete(xRaquete , yRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  //mostrarRaquete(raquete.x, raquete.y);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente , yRaqueteOponente);
  incluiPlacar();
  marcaPonto();

  
}

function mostraBolinha (){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
    if (xBolinha + raio> width ||
     xBolinha - raio < 0){ 
  velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostrarRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
  
}



function movimentaMinhaRaquete(){
  if (keyIsDown (UP_ARROW)){
    yRaquete -= 10;
  }
   if (keyIsDown (DOWN_ARROW)){
    yRaquete += 10;
  }
  
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento
     && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete ){
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y){
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
    }
}



function movimentaRaqueteOponente(){
  if (keyIsDown (87)){
    yRaqueteOponente -= 10;
  }
   if (keyIsDown (83)){
    yRaqueteOponente += 10;
     calculaChanceDeErrar()
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar(){
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0))
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos,170, 26);
  fill(color(255, 140, 0))
  rect (450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
  }
  if (xBolinha < 10){
    pontosDoOponente +=1
  }
}
