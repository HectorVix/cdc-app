import { FormBuilder, FormGroup } from '@angular/forms';
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
        return fb.group({
            'localizacionId': row.localizacionId,
            //página1
            //identificadores
            'codigole': row.codigole,
            'ident': "" + row.ident,
            //  'nombres': '',
            //'nomcomuns': '',
            //'rangog': '',
            //'rangon': '',
            //'rangos': '',
            //localizadores
            'subnacion': row.subnacion,
            'subdivision': row.subdivision,
            'codsitio': row.codsitio,
            'nomsitio': row.nomsitio,
            'sitioeva': row.sitioeva,
            'precisionl': row.precisionl,
            'nommapa': row.nommapa,
            'codmapa': row.codmapa,
            'nummarg': row.nummarg,
            'numpunto': row.numpunto,
            'diezdiez': row.diezdiez,
            'latitud': row.latitud,
            'longitud': row.longitud,
            'coords': row.coords,
            'coordn': row.coordn,
            'coorde': row.coorde,
            'coordo': row.coordo,
            'direccion': row.direccion,
            'ecoregion': row.ecoregion,
            'cuenca': row.cuenca,
            //status
            'fechaeva': fechaServicio.getFecha(row.fechaeva),
            'ultobs': fechaServicio.getFecha(row.ultobs),
            'priobs': row.priobs,
            'rangole': row.rangole,
            'fecharangole': fechaServicio.getFecha(row.fecharangole),
            'comrangole': row.comrangole,
            //'resprg': '',
            'datosle': row.datosle,
            'contacto': row.contacto,
            'numcontacto': row.numcontacto,
            //descripción
            'desgen': row.desgen,
            'elev': row.elev,
            'area': row.area,
            //protección
            //'lista_proteccion': '',
            'masterreno': val_masterreno,
            'masprotec': val_masprotec,
            'masmanejo': val_masmanejo,
            'involtnc': val_involtnc,
            'commanejo': row.commanejo,
            'comprot': row.comprot,
            //propietario
            'prop': row.prop,
            'infprop': val_infprop,
            'comprop': row.comprop,
            //campos opcionales
            'leopc1': row.leopc1,
            'leopc2': row.leopc2,
            'leopc3': row.leopc3,
            'leopc4': row.leopc4,
            'leopc5': row.leopc5,
            'leopc6': row.leopc6,
            'leopc7': row.leopc7,
            'leopc8': row.leopc8,
            'leopc9': row.leopc9,
            'leopc10': row.leopc10,
            //comentarios generales
            'comentario': row.comentario,
            //documentación y mantenimiento
            'sensdatos': val_sensdatos,
            'limites': val_limites,
            'fotos': val_fotos,
            'mejorfuente': row.mejorfuente,
            'codfuente': row.codfuente,

            'mdrev': val_mdrev,
            'transcrito': fechaServicio.getFecha(row.transcrito),
            'cc': val_cc,
            'cartografo': fechaServicio.getFecha(row.cartografo),
            'respdatos': row.respdatos,
            'actualizar': fechaServicio.getFecha(row.actualizar)

        });
    }

}