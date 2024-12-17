import { aleatorio } from "./aleatorio.js";
import { perguntas } from "./perguntas.js";

const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultados = document.querySelector(".caixa-resultados");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

let atual = 0;
let perguntaAtual;
let historiaFinal = "";
let nomeUsuario = "";

botaoIniciar.addEventListener("click", iniciaJogo);

function iniciaJogo() {
  nomeUsuario = document.getElementById("nomeUsuario").value.trim(); // Captura o nome do usuário
  if (nomeUsuario === "") {
    alert("Por favor, insira seu nome!"); // Alerta caso o nome não tenha sido digitado
    return; // Impede o jogo de iniciar sem nome
  }

  atual = 0;
  historiaFinal = "";
  telaInicial.style.display = "none";
  caixaPerguntas.classList.remove("mostrar");
  caixaAlternativas.classList.remove("mostrar");
  caixaResultados.classList.remove("mostrar");
  substituiNome();
  mostraPergunta();
}

function substituiNome() {
  for (const pergunta of perguntas) {
    pergunta.enunciado = pergunta.enunciado
      .replace(/você/g, nomeUsuario)
      .replace(/Você/g, nomeUsuario); // Substitui "você" e "Você"
    for (const alternativa of pergunta.alternativas) {
      alternativa.texto = alternativa.texto
        .replace(/você/g, nomeUsuario)
        .replace(/Você/g, nomeUsuario); // Substitui nas alternativas
    }
  }
}

function mostraPergunta() {
  if (atual >= perguntas.length) {
    mostraResultado();
    return;
  }
  perguntaAtual = perguntas[atual];
  caixaPerguntas.textContent = perguntaAtual.enunciado;
  caixaAlternativas.textContent = "";
  mostraAlternativas();
}

function mostraAlternativas() {
  for (const alternativa of perguntaAtual.alternativas) {
    const botaoAlternativas = document.createElement("button");
    botaoAlternativas.textContent = alternativa.texto;
    botaoAlternativas.addEventListener("click", () =>
      respostaSelecionada(alternativa)
    );
    caixaAlternativas.appendChild(botaoAlternativas);
  }
}

function respostaSelecionada(opcaoSelecionada) {
  const afirmacoes = aleatorio(opcaoSelecionada.afirmacao);
  historiaFinal +=
    afirmacoes.replace(/você/g, nomeUsuario).replace(/Você/g, nomeUsuario) +
    " ";
  if (opcaoSelecionada.proximaPergunta !== undefined) {
    atual = opcaoSelecionada.proximaPergunta;
  } else {
    mostraResultado();
    return;
  }
  mostraPergunta();
}

function mostraResultado() {
  caixaPerguntas.textContent = `Em 2050, ${nomeUsuario}`;
  textoResultado.textContent = historiaFinal;
  caixaAlternativas.textContent = "";
  caixaResultados.classList.add("mostrar");
  botaoJogarNovamente.addEventListener("click", jogarNovamente);
}

function jogarNovamente() {
  atual = 0;
  historiaFinal = "";
  textoResultado.textContent = "";
  caixaResultados.classList.remove("mostrar");
  telaInicial.style.display = "block";
  caixaPerguntas.classList.remove("mostrar");
  caixaAlternativas.classList.remove("mostrar");
  caixaPerguntas.textContent = "";
  caixaAlternativas.textContent = "";
}
