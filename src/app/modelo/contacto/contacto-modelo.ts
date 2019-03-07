export class contacto_Modelo {
    contactoId: Number;
    //identificadores
    numident: String;
    nombreident: String;
    titulo: String;
    nombre: String;
    apellido1: String;
    apellido2: String;
    sufijo: String;
    posicion: String;
    institucion: String;
    //localizadores
    email: String;
    dir1: String;
    dir2: String;
    dir3: String;
    pais: String;
    ciudad: String;
    subnacion: String;
    codpostal: String;
    masident: String;
    smsa: String;
    teleftrabajo: Number; //*number
    telefhogar: Number;   //*number
    //tipos de contactos
    tipocont: String;
    //actividades con el contacto
    activcont: String;
    //descripción
    resumen: String;
    //documentación y mantenimiento
    coddirp: String;
    actualizar: Date;//*date
    //relaciones
    uSUARIOusuarioid: any;
    contactoHasAreaList: any;
    contactoHasSitioList: any;
    contactoHasLoteList: any;
    contactosHasFuenteList: any;
}