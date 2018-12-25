export class sitio_Modelo {
    sitioId:Number;
    //identificadores
    codsitio:String;
    nomsitio:String;
    sinsitio:String;
    //localizadores
    nacion:String;
    subnacion:String;
    siteresp:String;
    lat:String;
    long1:String;
    coords:String;
    coordn:String;
    coorde:String;
    coordo:String;
    direccion:String;
    //descripción del sitio/diseño
    descrito:String;
    mapasitio:String;
    fechamapa:Date;
    dibujante:String;
    justlimite:String;
    areaprisec1:Number;
    areaprisec2:Number;
    areapri1:Number;
    areapri2:Number;
    areatotal1:Number;
    areatotal2:Number;
    comsitio:String;
    //importancia del sitio
    rangoant:String;
    comrango:String;
    impdivbiol:String;
    comdivbiol:String;
    impnodivbiol:String;
    comnodivbiol:String;
    urgencia:String;
    comurgencia:String;
    //bienes raíces y portección
    intenccons:String;
    numlotes:Number;
    costestprot1:Number;
    costestprot2:Number;
    coddesig:String;
    designacion:String;
    comprot:String;
    //administración
    comusotierra:String;
    compeligrnat:String;
    comexoticas:String;
    usotierraf:String;
    necinform:String;
    necmanejo:String;
    comam:String;    
    //campos opcionales
    rbsopc1:String;
    rbsopc2:String;
    rbsopc3:String;
    rbsopc4:String;
    rbsopc5:String;    
    //mantenimiento del registro
    respdatos:String;
    actualizar:Date;
    //relaciones
    localizacionList:any;
    areaList:any;
    fotoList:any;
    oberservacionesList:any;
    macsitioList:any;
    subdivisionList:any;

}