export interface Jugada{
    id:number,
    puntajeCroupier:number,
    puntajeUsuario: number,
    UsuarioId: number,
    cartasCroupier:any[],
    cartasUsuario:any[],
    mazo:any[],
    terminada:boolean,
    cantDisponible: number,
    perdio: string,
    gano: boolean
}