import { FormBuilder, FormGroup } from '@angular/forms';
import { area_Modelo } from '../../modelo/area/area-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
import { retryWhen } from 'rxjs/operators';
export class area_FormGroup {
    constructor() { }
    getAreaFormGrup(row: area_Modelo): FormGroup {
        if (row.multisubnac == undefined)
            row.multisubnac = null;
        if (row.limites == undefined)
            row.limites = null;
        if (row.continua == undefined)
            row.continua = null;
        if (row.involtnc == undefined)
            row.involtnc = null;
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'areaId': row.areaId,
            //página1
            //identificadores
            'codigoam': row.codigoam,
            'nombream': row.nombream,
            'sinam': row.sinam,
            'ammayor': row.ammayor,
            'coddueno': row.coddueno,
            'codsitio': row.codsitio,
            'nomsitio': row.nomsitio,
            //localizadores
            'nacion': row.nacion,
            'subnacion': row.subnacion,
            'subdivision': row.subdivision,
            'nommapa': row.nommapa,
            'codmapa': row.codmapa,
            'nummarg': row.nummarg,
            'lat': row.lat,
            'long1': row.long1,
            'coords': row.coords,
            'coordn': row.coordn,
            'coorde': row.coorde,
            'coordo': row.coordo,
            //decriptores
            'descripcion': row.descripcion,
            'areatot1': row.areatot1, //number
            'areatot2': row.areatot2, //number
            'areasubnac1': row.areasubnac1,//number
            'areasubnac2': row.areasubnac2,//number
            'multisubnac': row.multisubnac, //boolean
            'limites': row.limites,//boolean
            'continua': row.continua,//boolean
            'involtnc': row.involtnc, //boolean
            'comentario': row.comentario,
            //status
            'fechaesta': fechaServicio.getFecha(row.fechaesta),
            'protasign': row.protasign, //varchar(1)
            //manejo
            'administrador': row.administrador,
            'instadmin': row.instadmin,
            'diradmin1': row.diradmin1,
            'diradmin2': row.diradmin2,
            'ciudadadmin': row.ciudadadmin,
            'subnacadmin': row.subnacadmin,
            'codpostaladmin': row.codpostaladmin,
            'telefadminist': row.telefadminist,
            'accesopub': row.accesopub, //varchar(1)
            'instcoop': row.instcoop,
            'commanejo': row.commanejo,
            //elementos
            // 'lista_elementos': '',// lista de codigoe,nombres, status y codfuente
            //campos opcionales
            'amopc1': row.amopc1,
            'amopc2': row.amopc2,
            'amopc3': row.amopc3,
            'amopc4': row.amopc4,
            'amopc5': row.amopc5,
            //mantenimiento del registro
            'respdatos': row.respdatos,
            'actualizar': fechaServicio.getFecha(row.actualizar)
        });
    }
}