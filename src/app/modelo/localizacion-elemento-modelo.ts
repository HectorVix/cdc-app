import { rastreo_Elemento_Modelo } from '../modelo/rastreo/rastreo-elemento-modelo';
export class localizacion_Elemento_Modelo {
  //página1
  //identificadores
  datosle: String;
  desgen: String;
  leopc1: String; leopc2: String; leopc3: String; leopc4: String; leopc5: String; leopc6: String; leopc7: String; leopc8: String; leopc9: String; leopc10: String;

  codigole: String;
  ident: String;
  nombres: String;
  nomcomuns: String;
  rangog: String;
  rangon: String;
  rangos: String;
  //localizadores
  subnacion: String;
  subdivision: String;
  codsitio: String;
  nomsitio: String;
  sitioeva: String;
  precision: String;
  nommapa: String;
  codmapa: String;
  nummarg: String;
  numpunto: String;
  diezdiez: String;
  latitud: String;
  longitud: String;
  coords: String;
  coordn: String;
  coorde: String;
  coordo: String;
  direccion: String;
  ecoregion: String;
  cuenca: String;
  //status       
  fechaeva: Date;
  ultobs: Date;
  priobs: String;
  rangole: String;
  fecharangole: Date;
  comrangole: String;
  resprg: String;

  contacto: String;
  numcontacto: String;
  //descripción  

  elev: Number;
  area: Number;
  //protección
  //lista_proteccion: 
  masterreno: String;
  masprotec: String;
  masmanejo: String;
  involtnc: String;
  commanejo: String;
  comprot: String;
  //propietario
  prop: String;
  infprop: String;
  comprop: String;
  //campos opcionales
  //comentarios generales
  comentario: String;
  //documentación y mantenimiento
  sensdatos: String;
  limites: String;
  fotos: String;
  mejorfuente: String;
  codfuente: String;
  transcrito: Date;
  mdrev: String;
  cartografo: Date;
  cc: String;
  respdatos: String;
  actualizar: Date;

  localizacionId: Number;
  sitioList: any;
  proteccionList: any;
  ecomonitoreoList: any;
  protocoloList: any;
  rASTREOrastreoid: rastreo_Elemento_Modelo;

}