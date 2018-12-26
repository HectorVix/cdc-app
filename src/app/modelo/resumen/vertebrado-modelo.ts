export class vertebrado_Modelo {
    vertebradoId: Number;
    //identificadores
    codigoe: String;  
    nacion: String;
    nombreg: String;
    autor: String;
    nombren: String;
    nomcomunn: String;
    //taxonomía
    clasetax: String;
    orden: String;
    familia: String;
    genero: String;
    comtaxg: String;
    comsubespn: String;
    //status
    rangog: String;
    cites: String;
    uicn: String;
    aepeu: String;
    fechaaepeu: Date;//date
    endemismo: String;
    comstatg: String;
    rangon: String;
    protnacion: String;
    rastreolen: String;
    espdeportn: String;
    espcomern: String;
    pezdeport: String;
    ndeportpro: String;
    cazapieln: String;
    pesten: String;
    comstatn: String;
    //distribución
    //lista_distribucion1: String;
    //lista_distribucion2: String;
    elevminn: Number;
    elevmaxn: Number;
    comdistg: String;
    comdistn: String;
    //migración
    residente: String;
    miglocal: String;
    migdist: String;
    repn: String;
    norepn: String;
    transmign: String;
    aparirregn: String;
    mign: String;
    commigg: String;
    commign: String;
    //habitat
    marino: String;
    estuarino: String;
    fluvial: String;
    lacustre: String;
    palustre: String;
    terrestre: String;
    subterran: String;
    factorespe: String;
    comhabg: String;
    comhabrep: String;
    comhabn: String;
    //hábitos alimenticios
    habitosalim: String;
    comalimg: String;
    comalimn: String;
    //ecología
    comecolg: String;
    comecoln: String;
    //fenología-Estacionalidad
    fenologia: String;
    // nenea: String; nabra: String; njula: String; nocta: String;
    //neneb: String; nabrb: String; njulb: String; noctb: String;
    //nfeba: String; nmaya: String; nagoa: String; nnova: String;
    //nfebb: String; nmayb: String; nagob: String; nnovb: String;
    //nmara: String; njuna: String; nseta: String; ndica: String;
    //nmarb: String; njunb: String; nsetb: String; ndicb: String;
    comfenolg: String;
    comfenoln: String;
    //reproducción
    colrep: String;
    comrepg: String;
    comrepn: String;
    //manejo
    commanejog: String;
    commanejon: String;
    //atributos misceláneos
    usoeconom: String;
    longitud: Number;
    peso: Number;
    //campos opcionales
    rcvnopc1: String;
    rcvnopc2: String;
    rcvnopc3: String;
    rcvnopc4: String;
    rcvnopc5: String;
    //referencias
    refg: String;
    refn: String;
    //matenimiento del registro
    ediciong: Date; //date
    actualizag: Date; //date
    edicionn: Date;  //date
    actualizan:Date; //date
    //relaciones
    cARACTERIZACIONcaracterizacionid: any;
    fotoList: any;
    vERTEBRADOvertebradoid: any;
    distribucionList: any;
}