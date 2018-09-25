import { rastreo_Elemento_Modelo } from '../../modelo/rastreo/rastreo-elemento-modelo';
export class Localizacion_Modelo {
    localizacionId : Number;
    codigole:String;
    //localizadores
    ident:Boolean;
    subnacion:String;
    subdivision:String;
    codsitio:String;
    nomsitio:String;
    sitioeva:String;
    precisionl:String;
    
    nommapa:String;
    codmapa:String;
    nummarg:String;
    numpunto:String;
    diezdiez:String;
    latitud:String;
    longitud:String;
    coords:String;
    coordn:String;
    coorde:String;
    coordo:String;
    direccion:String;
    ecoregion:String;
    cuenca:String;
    //status
    fechaeva:Date;
    ultobs:Date;
    priobs:String;
    rangole:String;
    fecharangole:Date;
    comrangole:String;
    datosle:String;
    contacto:String;
    numcontacto:String;
    //descripcion
    desgen:String;
    elev:Number;
    area:Number;
    //proteccion
    masterreno:String;
    masprotec:String;
    masmanejo:String;
    involtnc:String;
    commanejo:String;
    comprot:String;
    //propietario
    prop:String;
    infprop:Boolean;
    comprop:String;
    //campos opcionales
    leopc1:String;
    leopc2:String;
    leopc3:String;
    leopc4:String;
    leopc5:String;
    leopc6:String;
    leopc7:String;
    leopc8:String;
    leopc9:String;
    leopc10:String;
    //comentarios generales
    comentario:String;
    //documentacion y mantenimiento
    sensdatos:Boolean;
    limites:Boolean;
    fotos:Boolean;
    mejorfuente:String;
    codfuente:String;
    mdrev:Boolean;
    transcrito:Date;
    cc:Boolean;
    cartografo:Date;
    respdatos:Date;
    actualizar:Date;

    //relaciones
    sitioList:any;
    proteccionList:any;
    protocoloList:any;
    rASTREOrastreoid=rastreo_Elemento_Modelo;
    observacionesList:any;
}