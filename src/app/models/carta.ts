export interface Carta {
  id: number;
  valor: string; //["2","3","4","5","6","7","8","9","10","j","q","k","a"];
  palo: string; //["hearts","diamonds","clubs","spades"];
  valorJuego: number; //[2,3,4,5,6,7,8,9,10,11,12,13,14];
  color: string; //Black: clubs-spades // Red: hearts-diamonds
  img: string;
}
