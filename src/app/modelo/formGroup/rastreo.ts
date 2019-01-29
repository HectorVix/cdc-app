import { FormBuilder, FormGroup } from '@angular/forms';
import { rastreo_Elemento_Modelo } from '../../modelo/rastreo/rastreo-elemento-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class rastreo_Elemento_FormGroup {
    constructor() { }
    getRastreo_Elemento_FormGrup(re: rastreo_Elemento_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        var val_exsituAux = re.exsitu;
        var val_exsituc = null;
        var val_transparencianAux = re.transparencian;
        var val_transparencian = null;
        var val_transparenciasAux = re.transparencias;
        var val_transparencias = null;
        //no deja asignar directamente el  valor por el 3 valor que es cuando se selecciona --Ninguna--
        if (val_exsituAux == true)
            val_exsituc = "" + true;
        if (val_exsituAux == false)
            val_exsituc = "" + false;

        if (val_transparencianAux == true)
            val_transparencian = "" + true;
        if (val_transparencianAux == false)
            val_transparencian = "" + false;

        if (val_transparenciasAux == true)
            val_transparencias = "" + true;
        if (val_transparenciasAux == false)
            val_transparencias = "" + false;
        return fb.group({
            'rastreoId': re.rastreoId,
            //pagina1
            //identificadores
            'codigoe': re.codigoe,
            'tropicos': re.tropicos,
            'nacion': re.nacion,
            'subnacion': re.subnacion,
            //taxonomia (global)
            'clasetax': re.clasetax,
            'orden': re.orden,
            'familia': re.familia,
            'genero': re.genero,
            'nombreg': re.nombreg,
            'autor': re.autor,
            'fuentenom': re.fuentenom,
            'refnombreg': re.refnombreg,
            'disttax': re.disttax,
            'dudatax': re.dudatax,
            'nomcomung': re.nomcomung,
            'comtaxg': re.comtaxg,
            //taxonomia (nacional)
            'nombren': re.nombren,
            'numsinn': re.numsinn,
            'nomcomunn': re.nomcomunn,
            'comtaxn': re.comtaxn,
            //status (global)
            'rangog': re.rangog,
            'fecharevrg': fechaServicio.getFecha(re.fecharevrg),
            'formularg': re.formularg,
            'resprg': re.resprg,
            'aepeu': re.aepeu,
            'fechaaepeu': fechaServicio.getFecha(re.fechaaepeu),
            'cites': re.cites,
            'iucn': re.iucn,
            'planscons': re.planscons,
            'resplan': re.resplan,
            'resumenman': re.resumenman,
            'resresumen': re.resresumen,
            'exsitu': val_exsituc, //Boolean
            'instexsitu': re.instexsitu,
            'endemismo': re.endemismo,
            //status (nacional)
            'rangon': re.rangon,
            'fecharevrn': fechaServicio.getFecha(re.fecharevrn),
            'formularn': re.formularn,
            'rastreolen': re.rastreolen,
            'lestimn': re.lestimn,
            'leprotn': re.leprotn,
            'abundn': re.abundn,
            'protnacion': re.protnacion,
            'refnombren': re.refnombren,
            'transparencian': val_transparencian,//Boolean
            //status (subnacional)
            'rangos': re.rangos,
            'fecharevrs': fechaServicio.getFecha(re.fecharevrs),
            'formulars': re.formulars,
            'rastreoles': re.rastreoles,
            'lestims': re.lestims,
            'leprots': re.leprots,
            'abunds': re.abunds,
            'protsubnac': re.protsubnac,
            'refnombres': re.refnombres,
            'transparencias': val_transparencias,
            //campos opcionales
            'reopc1': re.reopc1,
            'reopc2': re.reopc2,
            'reopc3': re.reopc3,
            'reopc4': re.reopc4,
            'reopc5': re.reopc5,
            // manteniiento del registro
            'codfuenten': re.codfuenten,
            'codfuentes': re.codfuentes,
            'actualizag': fechaServicio.getFecha(re.actualizag),
            'actualizan': fechaServicio.getFecha(re.actualizan),
            'actualizas': fechaServicio.getFecha(re.actualizas)
        });
    }

}