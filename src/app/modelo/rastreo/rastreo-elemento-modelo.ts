export class rastreo_Elemento_Modelo {
      //pagina1
      //identificadores
      rastreoId: Number;
      codigoe: String;
      tropicos: String;
      nacion: String;
      subnacion: String;
      //taxonomia (global)
      reinoId:String
      phylumId:String
      claseId:String
      clasetax: String
      ordenId: String
      familiaId: String
      generoId: String
      especieId:String
      infraspecificepithetId:String
      nombreg: String;
      autor: String;
      fuentenom: Number;
      refnombreg: String;
      disttax: String;
      dudatax: String;
      nomcomung: String;
      comtaxg: String;
      //taxonomia (nacional)
      nombren: String;
      numsinn: Number;
      nomcomunn: String;
      comtaxn: String;
      //status (global)
      rangog: String;
      fecharevrg: Date;
      formularg: String;
      resprg: String;
      aepeu: String;
      fechaaepeu: Date;
      cites: String;
      iucn: String;
      planscons: String;
      resplan: String;
      resumenman: String;
      resresumen: String;
      exsitu: Boolean;
      instexsitu: String;
      endemismo: String;
      //status (nacional)
      rangon: String;
      fecharevrn: Date;
      formularn: String;
      rastreolen: String;
      lestimn: String;
      leprotn: String;
      abundn: String;
      protnacion: String;
      refnombren: String;
      transparencian: Boolean;
      //status (subnacional)
      rangos: String;
      fecharevrs: Date;
      formulars: String;
      rastreoles: String;
      lestims: String;
      leprots: String;
      abunds: String;
      protsubnac: String;
      refnombres: String;
      transparencias: Boolean;
      //campos opcionales
      reopc1: String;
      reopc2: String;
      reopc3: String;
      reopc4: String;
      reopc5: String;
      // manteniiento del registro
      codfuenten: String;
      codfuentes: String;
      actualizag: Date;
      actualizan: Date;
      actualizas: Date;
      //relaciones
      fuenteList: any;
      localizacionList: any;
      eLEMENTOelementoid: any;
      observacionesList: any;
}