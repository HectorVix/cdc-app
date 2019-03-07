import { usuario_Modelo } from '../../modelo/usuario/usuario-modelo';
export class area_Modelo {
    areaId: Number;
    //identificadores
    codigoam: String;
    nombream: String;
    sinam: String;
    ammayor: String;
    coddueno: String;
    codsitio: String;
    nomsitio: String;
    //localizadores
    nacion: String;
    subnacion: String;
    subdivision: String;
    nommapa: String;
    codmapa: String;
    nummarg: String;
    lat: String;
    long1: String;
    coords: String;
    coordn: String;
    coorde: String;
    coordo: String;
    //descriptores
    descripcion: String;
    areatot1: Number;
    areatot2: Number;
    areasubnac1: Number;
    areasubnac2: Number;
    multisubnac: Boolean;
    limites: Boolean;
    continua: Boolean;
    involtnc: Boolean;
    comentario: String;
    //status
    fechaesta: Date;
    protasign: String;
    //manejo
    administrador: String;
    instadmin: String;
    diradmin1: String;
    diradmin2: String;
    ciudadadmin: String;
    subnacadmin: String;
    codpostaladmin: String;
    telefadminist: String;
    accesopub: String;
    instcoop: String;
    commanejo: String;
    //campos opcionales
    amopc1: String;
    amopc2: String;
    amopc3: String;
    amopc4: String;
    amopc5: String;
    //mantenimiento del registro
    respdatos: String;
    actualizar: Date;
    //relaciones
    sitioList: any;
    fotoList: any;
    oberservacionesList: any;
    listaElementoList: any;
    uSUARIOusuarioid: usuario_Modelo;
    contactoHasAreaList: any;
    areaHasLoteList: any;
}