export class planta_Modelo {
    plantaId: Number;
    //identificadores
    codigoe: String;
    nacion: String;
    nombren: String;
    nomcomunn: String;
    //taxonomia
    comsubespn: String;
    taxasimiln: String;
    comidentn: String;
    comtaxn: String;
    //status
    rangog: String;
    rangon: String;
    aepeu: String;
    cites: String;
    uicn: String;
    rastreolen: String;
    protnacion: String;
    malezan: String;
    clasifinstn: String;
    comstatn: String;
    //inventario
    priinventn: String;
    necinventn: String;
    cominventn: String;
    respropn: String;
    //distribucion
    elevminn: Number;
    elevmaxn: Number;
    disyuntn: String;
    periferican: String;
    comdistn: String;
    //habitat
    marinon: String;
    estuarinon: String;
    fluvialn: String;
    lacustren: String;
    palustren: String;
    terrestren: String;
    comhabn: String;
    //ecologia
    comecoln: String;
    //fenelogía
    fenologia: string
    comfenoln: String;
    //reproduccion
    comrepn: String;
    //manejo
    commanejon: String;
    //campos opcionales
    rcpnopc1: String;
    rcpnopc2: String;
    rcpnopc3: String;
    rcpnopc4: String;
    rcpnopc5: String;
    //mantenimiento del registro
    codfuente: String;
    cita: String;
    transparen: String;
    refg: String;
    refn: String;
    edicionn: Date;
    autoredn: String;
    actualizan: Date;
    //relaciones
    cARACTERIZACIONcaracterizacionid: any;
    fotoList: any;
    distribucionList: any;
    distribucion2List: any;

}