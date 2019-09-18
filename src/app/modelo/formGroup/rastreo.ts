import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { rastreo_Elemento_Modelo } from '../../modelo/rastreo/rastreo-elemento-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class rastreo_Elemento_FormGroup {
    constructor() { }
    getRastreo_Elemento_FormGrup(re: rastreo_Elemento_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        var val_exsitu_Aux = re.exsitu;
        var val_exsitu = "";
        var val_transparencian_Aux = re.transparencian;
        var val_transparencian = "";
        var val_transparencias_Aux = re.transparencias;
        var val_transparencias = "";
        //no deja asignar directamente el  valor por el 3 valor que es cuando se selecciona --Ninguna--
        if (val_exsitu_Aux == true)
            val_exsitu = "" + true;
        if (val_exsitu_Aux == false)
            val_exsitu = "" + false;

        if (val_transparencian_Aux == true)
            val_transparencian = "" + true;
        if (val_transparencian_Aux == false)
            val_transparencian = "" + false;

        if (val_transparencias_Aux == true)
            val_transparencias = "" + true;
        if (val_transparencias_Aux == false)
            val_transparencias = "" + false;

        /**
         * Los ♦ representan los mat-select el resto salvo rastreoId se valida su tamaño  
         */
        return fb.group({
            'rastreoId': re.rastreoId,
            /**
             * identificadores
             * Página1
             */
            'codigoe': new FormControl(re.codigoe, [Validators.maxLength(10), Validators.required]),
            'tropicos': re.tropicos,
            'nacion': 'GT',
            'subnacion': '1',
            //taxonomia (global)
            'clasetax': new FormControl(re.clasetax, Validators.maxLength(20)),
            'orden': new FormControl(re.orden, Validators.maxLength(20)),
            'familia': new FormControl(re.familia, Validators.maxLength(20)),
            'genero': new FormControl(re.genero, Validators.maxLength(20)),
            'nombreg': new FormControl({ value: '', disabled: true }),
            'autor': new FormControl(re.autor, Validators.maxLength(60)),
            'fuentenom': new FormControl(re.fuentenom, Validators.maxLength(2)),
            'refnombreg': new FormControl(re.refnombreg, Validators.maxLength(60)),
            'disttax': re.disttax,//♦
            'dudatax': re.dudatax,//♦
            'nomcomung': new FormControl(re.nomcomung, Validators.maxLength(60)),
            'comtaxg': new FormControl(re.comtaxg, Validators.maxLength(120)),
            //taxonomia (nacional)
            'nombren': new FormControl(re.nombren, Validators.maxLength(60)),
            'numsinn': re.numsinn,//Number (2)
            'nomcomunn': new FormControl(re.nomcomunn, Validators.maxLength(60)),
            'comtaxn': new FormControl(re.comtaxn, Validators.maxLength(120)),
            /**
             * Status (global)
             * Página 2
             */
            'rangog': new FormControl({ value: '', disabled: true }),
            'formularg': re.formularg,//♦
            'resprg': new FormControl({ value: '', disabled: true }),
            'fecharevrg': new FormControl({ value: fechaServicio.get_Fecha(re.fecharevrg), disabled: true }),
            'aepeu': new FormControl(re.aepeu, Validators.maxLength(10)),
            'cites': re.cites,//♦
            'iucn': re.iucn,//♦
            'fechaaepeu': fechaServicio.get_Fecha(re.fechaaepeu),
            'planscons': re.planscons,//♦
            'resplan': new FormControl(re.resplan, Validators.maxLength(10)),
            'resumenman': re.resumenman,//♦
            'resresumen': new FormControl(re.resresumen, Validators.maxLength(10)),
            'exsitu': val_exsitu,//♦ Boolean
            'instexsitu': new FormControl(re.instexsitu, Validators.maxLength(6)),
            'endemismo': re.endemismo,//♦
            //status (nacional)
            'rangon': new FormControl({ value: '', disabled: true }),//♦ (6)
            'formularn': re.formularn,//♦
            'rastreolen': new FormControl(re.rastreolen, Validators.maxLength(10)),
            'fecharevrn': new FormControl({ value: fechaServicio.get_Fecha(re.fecharevrn), disabled: true }),
            'lestimn': new FormControl({ value: '', disabled: true }),
            'leprotn': new FormControl({ value: '', disabled: true }),
            'abundn': new FormControl({ value: '', disabled: true }),
            'protnacion': new FormControl(re.protnacion, Validators.maxLength(4)),
            'refnombren': new FormControl(re.refnombren, Validators.maxLength(60)),
            'transparencian': val_transparencian,//♦
            //status (subnacional)
            'rangos': new FormControl({ value: '', disabled: true }),//♦ (6)
            'formulars': re.formulars,//♦
            'rastreoles': new FormControl(re.rastreoles, Validators.maxLength(10)),
            'fecharevrs': new FormControl({ value: fechaServicio.get_Fecha(re.fecharevrs), disabled: true }),
            'lestims': new FormControl({ value: '', disabled: true }),
            'leprots': new FormControl({ value: '', disabled: true }),
            'abunds': new FormControl({ value: '', disabled: true }),
            'protsubnac': new FormControl(re.protsubnac, Validators.maxLength(4)),
            'refnombres': new FormControl(re.refnombres, Validators.maxLength(60)),
            'transparencias': val_transparencias,//♦
            //campos opcionales
            'reopc1': new FormControl(re.reopc1, Validators.maxLength(60)),
            'reopc2': new FormControl(re.reopc2, Validators.maxLength(60)),
            'reopc3': new FormControl(re.reopc3, Validators.maxLength(60)),
            'reopc4': new FormControl(re.reopc4, Validators.maxLength(60)),
            'reopc5': new FormControl(re.reopc5, Validators.maxLength(120)),
            // manteniiento del registro
            'codfuenten': new FormControl(re.codfuenten, Validators.maxLength(99)),
            'codfuentes': new FormControl(re.codfuentes, Validators.maxLength(99)),
            'actualizag': fechaServicio.get_Fecha(re.actualizag),
            'actualizan': fechaServicio.get_Fecha(re.actualizan),
            'actualizas': fechaServicio.get_Fecha(re.actualizas)
        });
    }

}