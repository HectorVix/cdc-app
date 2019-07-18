import { FormBuilder, FormGroup ,FormControl,Validators} from '@angular/forms';
import { Localizacion_Modelo } from '../../modelo/localizacion/localizacion-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class localizacion_FormGroup {
    constructor() { }
    getLocalizacion_FormGrup(row: Localizacion_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        var val_ident_Aux = row.ident;
        var val_ident = "";
        var val_masterreno_Aux = row.masterreno;
        var val_masterreno = "";
        var val_masprotec_Aux = row.masprotec;
        var val_masprotec = "";
        var val_involtnc_Aux = row.involtnc;
        var val_involtnc = "";
        var val_sensdatos_Aux = row.sensdatos;
        var val_sensdatos = "";
        var val_limites_Aux = row.limites;
        var val_limites = "";
        var val_fotos_Aux = row.fotos;
        var val_fotos = "";
        var val_infprop_Aux = row.infprop;
        var val_infprop = "";
        var val_masmanejo_Aux = row.masmanejo;
        var val_masmanejo = "";
        var val_mdrev_Aux = row.mdrev;
        var val_mdrev = "";
        var val_cc_Aux = row.cc;
        var val_cc = "";

        //no deja asignar directamente el  valor por el 3 valor que es cuando se selecciona --Ninguna--
        if (val_mdrev_Aux == true)
            val_mdrev = "" + true;
        if (val_mdrev_Aux == false)
            val_mdrev = "" + false;

        if (val_cc_Aux == true)
            val_cc = "" + true;
        if (val_cc_Aux == false)
            val_cc = "" + false;


        if (val_infprop_Aux == true)
            val_infprop = "" + true;
        if (val_infprop_Aux == false)
            val_infprop = "" + false;

        if (val_masmanejo_Aux == true)
            val_masmanejo = "" + true;
        if (val_masmanejo_Aux == false)
            val_masmanejo = "" + false;

        if (val_ident_Aux == true)
            val_ident = "" + true;
        if (val_ident_Aux == false)
            val_ident = "" + false;

        if (val_masterreno_Aux == true)
            val_masterreno = "" + true;
        if (val_masterreno_Aux == false)
            val_masterreno = "" + false;

        if (val_masprotec_Aux == true)
            val_masprotec = "" + true;
        if (val_masprotec_Aux == false)
            val_masprotec = "" + false;

        if (val_involtnc_Aux == true)
            val_involtnc = "" + true;
        if (val_involtnc_Aux == false)
            val_involtnc = "" + false;

        if (val_sensdatos_Aux == true)
            val_sensdatos = "" + true;
        if (val_sensdatos_Aux == false)
            val_sensdatos = "" + false;

        if (val_limites_Aux == true)
            val_limites = "" + true;
        if (val_limites_Aux == false)
            val_limites = "" + false;

        if (val_fotos_Aux == true)
            val_fotos = "" + true;
        if (val_fotos_Aux == false)
            val_fotos = "" + false;

        /**
         * Los ♦ representan los mat-select el resto salvo localizacionId se valida su tamaño  
         */
        return fb.group({
            'localizacionId': row.localizacionId,
            /**
             * Identificadores
             * Página1
             */
            'codigole': new FormControl(row.codigole, Validators.maxLength(10)),
            'ident': val_ident,//♦
            'nombres': new FormControl(row.nombres, Validators.maxLength(10)),
            'nomcomuns': new FormControl(row.nomcomuns, Validators.maxLength(10)),
            'rangog': new FormControl(row.rangog, Validators.maxLength(10)),
            'rangon': new FormControl(row.rangon, Validators.maxLength(10)),
            'rangos': new FormControl(row.rangos, Validators.maxLength(10)),
            //localizadores
            'subnacion': new FormControl(row.subnacion, Validators.maxLength(10)),
            'subdivision': new FormControl(row.subdivision, Validators.maxLength(10)),
            'codsitio': new FormControl(row.codsitio, Validators.maxLength(10)),
            'nomsitio': new FormControl(row.nomsitio, Validators.maxLength(10)),
            'sitioeva': new FormControl(row.sitioeva, Validators.maxLength(10)),
            'precisionl': new FormControl(row.precisionl, Validators.maxLength(10)),//palabra reservada en java
            'nommapa': new FormControl(row.nommapa, Validators.maxLength(10)),
            'codmapa': new FormControl(row.codmapa, Validators.maxLength(10)),
            'nummarg': new FormControl(row.nummarg, Validators.maxLength(10)),
            'numpunto': new FormControl(row.numpunto, Validators.maxLength(10)),
            'diezdiez': new FormControl(row.diezdiez, Validators.maxLength(10)),
            'latitud': new FormControl(row.latitud, Validators.maxLength(10)),
            'longitud': new FormControl(row.longitud, Validators.maxLength(10)),
            'coords': new FormControl(row.coords, Validators.maxLength(10)),
            'coordn': new FormControl(row.coordn, Validators.maxLength(10)),
            'coorde': new FormControl(row.coorde, Validators.maxLength(10)),
            'coordo': new FormControl(row.coordo, Validators.maxLength(10)),
            'direccion': new FormControl(row.direccion, Validators.maxLength(10)),
            'ecoregion': new FormControl(row.ecoregion, Validators.maxLength(10)),
            'cuenca': new FormControl(row.cuenca, Validators.maxLength(10)),
            //status
            'priobs': new FormControl(row.priobs, Validators.maxLength(10)),
            'fechaeva': fechaServicio.getFecha(row.fechaeva),
            'rangole': row.rangole,//♦
            'ultobs': fechaServicio.getFecha(row.ultobs),
            'fecharangole': fechaServicio.getFecha(row.fecharangole),
            'comrangole': new FormControl(row.comrangole, Validators.maxLength(10)),
            //'resprg': '',
            'datosle': new FormControl(row.datosle, Validators.maxLength(10)),
            'contacto': new FormControl(row.contacto, Validators.maxLength(10)),
            'numcontacto': new FormControl(row.numcontacto, Validators.maxLength(10)),
            /**
             * Página 2
             * Descripción
             */
            'desgen': new FormControl(row.desgen, Validators.maxLength(10)),
            'elev': row.elev,//Number
            'area': row.area,//Number
            //Protección
            'masterreno': val_masterreno,//♦
            'masprotec': val_masprotec,//♦
            'masmanejo': val_masmanejo,//♦
            'involtnc': val_involtnc,//♦
            'commanejo': new FormControl(row.commanejo, Validators.maxLength(10)),
            'comprot': new FormControl(row.comprot, Validators.maxLength(10)),
            //Propietario
            'prop': new FormControl(row.prop, Validators.maxLength(10)),
            'infprop': val_infprop,//♦
            'comprop': new FormControl(row.comprop, Validators.maxLength(10)),
            //campos opcionales
            'leopc1': new FormControl(row.leopc1, Validators.maxLength(10)),
            'leopc2': new FormControl(row.leopc2, Validators.maxLength(10)),
            'leopc3': new FormControl(row.leopc3, Validators.maxLength(10)),
            'leopc4': new FormControl(row.leopc4, Validators.maxLength(10)),
            'leopc5': new FormControl(row.leopc5, Validators.maxLength(10)),
            'leopc6': new FormControl(row.leopc6, Validators.maxLength(10)),
            'leopc7': new FormControl(row.leopc7, Validators.maxLength(10)),
            'leopc8': new FormControl(row.leopc8, Validators.maxLength(10)),
            'leopc9': new FormControl(row.leopc9, Validators.maxLength(10)),
            'leopc10': new FormControl(row.leopc10, Validators.maxLength(10)),
            /**
             * Página 3
             * Comentarios generales
             */
            'comentario': new FormControl(row.comentario, Validators.maxLength(10)),
            //documentación y mantenimiento
            'sensdatos': val_sensdatos,//♦
            'limites': val_limites,//♦
            'fotos': val_fotos,//♦
            'mejorfuente': new FormControl(row.mejorfuente, Validators.maxLength(10)),
            'codfuente': new FormControl(row.codfuente, Validators.maxLength(10)),
            'mdrev': val_mdrev,//♦
            'transcrito': fechaServicio.getFecha(row.transcrito),
            'cc': val_cc,//♦
            'cartografo': fechaServicio.getFecha(row.cartografo),
            'respdatos': new FormControl(row.respdatos, Validators.maxLength(10)),
            'actualizar': fechaServicio.getFecha(row.actualizar)

        });
    }

}