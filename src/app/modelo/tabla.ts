export interface Proteccion {
    codigoam: String;
    nombream: String;
    contenido : String;
}

export interface CamposOpcionales{
    datos:String;
}

export interface Identificadores_Sitio{
    codmacsitio:String;
    nommacsitio:String;
}
export interface Localizadores_Sitio{
    codsubdiv:String;
    nomsubdiv:String;
    nommapa:String;
    codmapa:String;
}
export interface Elementos_AreasManejadas{
    codigoe:String;
    nombres:String;
    status:String;
    codfuente:String;

}
export interface Distribucion1_ResumenCaracterizacionPlantasNacional{
   codsubnac:String;
   nomsubnac:String;
   statsubnac:String; 
}

export interface Distribucion2_ResumenCaracterizacionPlantasNacional{
   codecoregn:String;
   statecoregn:String;
   codcuencan:String;
   statcuencan:String; 
}