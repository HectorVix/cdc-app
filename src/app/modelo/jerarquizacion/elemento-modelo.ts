import { usuario_Modelo } from '../../modelo/usuario/usuario-modelo';

export class elemento_Modelo {
    elementoId: Number;
    codigoe: String;
    clase: String;
    comunidad: String;
    nombrecomunn: String;
    nombrecientifico: String;
    comentario: String;
    fecha: Date;
    fotoList: any;
    uSUARIOusuarioid: usuario_Modelo;
}