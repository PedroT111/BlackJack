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

const perdio = (puntaje) => {
  return puntaje > 21;
};

const blackJack = (cartasUsuario, puntaje) => {
  if(puntaje == 21 && cartasUsuario.length == 2){
    return true;
  }
}



const obtenerResultado = (participante, cartasCroupier, cartasJugador) => {
  let puntajeCroupier = 0;
  let puntajeUsuario = 0;
  let quienPerdio = "";
  let blackjack = false;

  if (cartasCroupier.length > 0) {
    puntajeCroupier = totalPuntos(cartasCroupier);
  }
  if (cartasJugador.length > 0) {
    puntajeUsuario = totalPuntos(cartasJugador);
  }
  if (puntajeUsuario > 21) {
    quienPerdio = 'jugador'
  }
  else if(puntajeCroupier < 22 && puntajeCroupier > puntajeUsuario){
    quienPerdio = 'jugador'
  } else if (puntajeCroupier < 22 && puntajeCroupier < puntajeUsuario){
    if(blackJack(cartasJugador, puntajeUsuario)){
      quienPerdio = 'croupier'
      blackjack = true;
    } else {
      quienPerdio = 'croupier'
    }
  } else if(puntajeCroupier < 22 && puntajeCroupier == puntajeUsuario){
    if(blackJack(cartasJugador, puntajeUsuario)){
      quienPerdio = 'croupier'
      blackjack = true;
    } else {
      quienPerdio = 'empate'
    }
  } else if(puntajeCroupier > 21){
    quienPerdio = 'croupier'
  }
  /*if (participante === "jugador") {
    perdio(puntajeUsuario) ? (quienPerdio = "jugador") : (quienPerdio = "");
  } else if (participante === "croupier") {
    perdio(puntajeCroupier) ? (quienPerdio = "croupier") : (quienPerdio = "");
  }
  if(blackJack(cartasJugador, puntajeUsuario)){
    blackjack = true;
    quienPerdio = 'croupier';
  }*/



  return { puntajeCroupier, puntajeUsuario, quienPerdio, blackjack };
};

module.exports = { obtenerResultado };
