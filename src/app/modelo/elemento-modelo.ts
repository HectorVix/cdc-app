import { UsuarioModelo } from '../modelo/usuario-modelo';

export class elemento_Modelo {
    elementoId: Number;
    codigo: String;
    nombrecomun: String;
    nombrecientifico: String;
    comentario: String;
    fecha: Date;
    uSUARIOusuarioid: UsuarioModelo;
    fotoList = null;
}


