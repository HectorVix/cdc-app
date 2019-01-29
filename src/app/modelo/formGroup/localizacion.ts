import { FormBuilder, FormGroup } from '@angular/forms';
import { Localizacion_Modelo } from '../../modelo/localizacion/localizacion-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class localizacion_FormGroup {
    constructor() { }
    getLocalizacion_FormGrup(row: Localizacion_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        var val_identAux = row.ident;
        var val_ident = "";
        var val_masterrenoAux = row.masterreno;
        var val_masterreno = "";
        var val_masprotecAux = row.masprotec;
        var val_masprotec = "";
        var val_masmanejoAux = row.masmanejo;
        var val_masmanejo = "";
        var val_involtncAux = row.involtnc;
        var val_involtnc = "";
        var val_infpropAux = row.infprop;
        var val_infprop = "";
        var val_sensdatosAux = row.sensdatos;
        var val_sensdatos = "";
        var val_limitesAux = row.limites;
        var val_limites = "";
        var val_fotosAux = row.fotos;
        var val_fotos = "";
        var val_mdrevAux = row.mdrev;
        var val_mdrev = "";
        var val_ccAux = row.cc;
        var val_cc = "";
        //no deja asignar directamente el  valor por el 3 valor que es cuando se selecciona --Ninguna--
        if (val_identAux == true)
            val_ident = "" + true;
        if (val_identAux == false)
            val_ident = "" + false;

        if (val_masterrenoAux == true)
            val_masterreno = "" + true;
        if (val_masterrenoAux == false)
            val_masterreno = "" + false;

        if (val_masprotecAux == true)
            val_masprotec = "" + true;
        if (val_masprotecAux == false)
            val_masprotec = "" + false;

        if (val_masmanejoAux == true)
            val_masmanejo = "" + true;
        if (val_masmanejoAux == false)
            val_masmanejo = "" + false;

        if (val_involtncAux == true)
            val_involtnc = "" + true;
        if (val_involtncAux == false)
            val_involtnc = "" + false;

        if (val_infpropAux == true)
            val_infprop = "" + true;
        if (val_infpropAux == false)
            val_infprop = "" + false;

        if (val_sensdatosAux == true)
            val_sensdatos = "" + true;
        if (val_sensdatosAux == false)
            val_sensdatos = "" + false;

        if (val_limitesAux == true)
            val_limites = "" + true;
        if (val_limitesAux == false)
            val_limites = "" + false;

        if (val_fotosAux == true)
            val_fotos = "" + true;
        if (val_fotosAux == false)
            val_fotos = "" + false;

        if (val_mdrevAux == true)
            val_mdrev = "" + true;
        if (val_mdrevAux == false)
            val_mdrev = "" + false;

        if (val_ccAux == true)
            val_cc = "" + true;
        if (val_ccAux == false)
            val_cc = "" + false;

        return fb.group({
            'localizacionId': row.localizacionId,
            //página1
            //identificadores
            'codigole': row.codigole,
            'ident': val_ident,
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
            'masterreno': val_masterreno,//Boolean
            'masprotec': val_masprotec,//Boolean
            'masmanejo': val_masmanejo,//Boolean
            'involtnc': val_involtnc,//Boolean
            'commanejo': row.commanejo,
            'comprot': row.comprot,
            //propietario
            'prop': row.prop,
            'infprop': val_infprop,//Boolean
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
            'sensdatos': val_sensdatos,//Boolean
            'limites': val_limites,//Boolean
            'fotos': val_fotos,//Boolean
            'mejorfuente': row.mejorfuente,
            'codfuente': row.codfuente,

            'mdrev': val_mdrev,//Boolean
            'transcrito': fechaServicio.getFecha(row.transcrito),
            'cc': val_cc,//Boolean
            'cartografo': fechaServicio.getFecha(row.cartografo),
            'respdatos': row.respdatos,
            'actualizar': fechaServicio.getFecha(row.actualizar)
        });
    }
}