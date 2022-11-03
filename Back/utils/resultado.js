const tieneAs = (carta) => {
  if (carta.valor === "as") {
    return true;
  }
  return false;
};

const totalPuntos = (cartas) => {
  let puntos = 0;

  for (i = 0; i < cartas.length; i++) {
    puntos += cartas[i].valorJuego;
  }

  if (cartas.find((item) => item.valor === "as") !== undefined) {
    const cartasConAses = cartas.filter(tieneAs);
    cartasConAses.forEach((i) => {
      if (puntos > 21) {
        puntos -= 10;
      }
    });
  }
  return puntos;
};

const blackJack = (cartasUsuario, puntaje) => {
  if(puntaje == 21 && cartasUsuario.length == 2){
    return true;
  }
}

const obtenerResultado = (cartasCroupier, cartasJugador) => {
  let puntajeCroupier = 0;
  let puntajeUsuario = 0;
  let resultado= 0; // 1- Gano 0-Empate -1-Perdio
  let blackjack = false;
  let terminada = false;


  if (cartasCroupier.length > 0) {
    puntajeCroupier = totalPuntos(cartasCroupier);
  }
  if (cartasJugador.length > 0) {
    puntajeUsuario = totalPuntos(cartasJugador);
  }
  if (puntajeUsuario > 21) {
    resultado = -1;
    terminada = true;
  }
  else if(puntajeCroupier < 22 && puntajeCroupier > puntajeUsuario){
    resultado= -1;
  } else if (puntajeCroupier < 22  && puntajeCroupier < puntajeUsuario){
    if(blackJack(cartasJugador, puntajeUsuario)){
      resultado = 1;
      terminada = true;
      blackjack = true;
    } else {
      resultado = 1
    }
  } else if(puntajeCroupier < 22 && puntajeCroupier == puntajeUsuario){
    if(blackJack(cartasJugador, puntajeUsuario)){
      resultado = 1
      blackjack = true;
      terminada = true;
    } else {
      resultado = 0;
    }
  } else if(puntajeCroupier > 21){
    resultado = 1
    terminada = true;
  }
  return { puntajeCroupier, puntajeUsuario, resultado, blackjack, terminada };
};

module.exports = { obtenerResultado };
