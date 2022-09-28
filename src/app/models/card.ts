export interface Card{
    id: number;
    value: string; //["2","3","4","5","6","7","8","9","10","j","q","k","a"];
    suit: string; //["hearts","diamonds","clubs","spades"];
    gameValue: number; //[2,3,4,5,6,7,8,9,10,11,12,13,14];
    color: string; //Black: clubs-spades // Red: hearts-diamonds
    img: string;
}