export interface Jugada{
    JugadaId:number,
    puntajeCroupier:number,
    puntajeUsuario: number,
    cartasCroupier:any[],
    cartasUsuario:any[],
    gano:boolean,
    terminada:boolean
}