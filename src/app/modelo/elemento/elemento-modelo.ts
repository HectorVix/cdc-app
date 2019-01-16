import { usuario_Modelo } from '../../modelo/usuario/usuario-modelo';

export class elemento_Modelo {
    elementoId: Number;
    codigo: String;
    nombrecomun: String;
    nombrecientifico: String;
    comentario: String;
    fecha: any;
    fotoList = null;
    uSUARIOusuarioid: usuario_Modelo;
}


