export class FuenteModelo {
  id = 0;
  codfuente = '';
  cita = '';
  area = '';
  //--falta aqui agregar para archivos .pdf
  pais = '';
  depto = '';
  municipio = '';
  latitud = '';
  longitud = '';
  sur = '';
  norte = '';
  este = '';
  oeste = '';
  resumen = '';
  tema: Tema[];
  publicacionCDC ='';
  clave ='';
  comentario=''; 
  notadigest='';
  fechaCreacion = Date;
  fechaActualizar = Date;
  inicialesPersona = '';

}  

export class Tema {
  comunat = false;
  comunterr = false;
  bosque = false;
  sabana = false;
  prado = false;
  chaparral = false;
  desierto = false;
  alpino = false;
  otroterr = false;
  comunac = false;
  palustre = false;
  lacustre = false;
  pluvial = false;
  estuarino = false;
  maritimo = false;
  subterp = false;
  //flora
  flora = false;
  floraac = false;
  floraterp = false;
  plnovasc = false;
  microorg = false;
  infositio = false;
  //fauna
  fauna = false;
  faunaac = false;
  faunaterr= false;
  moluscos=  false;
  insectos = false;
  crustaceos= false;
  otroantrop = false;
  otroinvert = false;
  peces= false;
  anfibios= false;
  reptiles = false;
  aves= false;
  mamiferos= false;
  cienfisic = false;
  fisiotopo = false;
  //
  hidrol= false;
  geologia= false;
  suelos=  false;
  clima=  false;
  biologia= false;
  ecologia = false;
  funecol=  false;
  diversnat= false;
  inventario= false;
  tecinvest=  false;
  am= false ;
  planmanejo= false;
  tecmanejo=  false;
  estimpamb = false;
  organprot = false;
  herrprot=  false;
}