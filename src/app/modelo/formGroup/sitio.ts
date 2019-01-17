import { FormBuilder, FormGroup } from '@angular/forms';
import { sitio_Modelo } from '../../modelo/sitio/sitio-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class sitio_FormGroup {
    constructor() { }
    getSitioFormGrup(row: sitio_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            //página1
            //identificadores
            'codsitio': row.codsitio,
            'nomsitio': row.nomsitio,
            'sinsitio': row.sinsitio,
            //localizadores
            'nacion': row.nacion,
            'subnacion': row.subnacion,
            'siteresp': row.siteresp,
            'lat': row.lat,
            'long1': row.long1,
            'coords': row.coords,
            'coordn': row.coordn,
            'coorde': row.coorde,
            'coordo': row.coordo,
            'direccion': row.direccion,
            //descripción del sitio/diseño
            'descrito': row.descrito,
            'mapasitio': row.mapasitio,
            'fechamapa': fechaServicio.getFecha(row.fechamapa),
            'dibujante': row.dibujante,
            'justlimite': row.justlimite,
            'areaprisec1': row.areaprisec1,
            'areaprisec2': row.areaprisec2,
            'areapri1': row.areapri1,
            'areapri2': row.areapri2,
            'areatotal1': row.areatotal1,
            'areatotal2': row.areatotal2,
            'comsitio': row.comsitio,
            //importancia del sitio
            'rangoant': row.rangoant,
            'comrango': row.comrango,
            'impdivbiol': row.impdivbiol,
            'comdivbiol': row.comdivbiol,
            'impnodivbiol': row.impnodivbiol,
            'comnodivbiol': row.comnodivbiol,
            'urgencia': row.urgencia,
            'comurgencia': row.comurgencia,
            //bienes raíces y portección
            'intenccons': row.intenccons,
            'numlotes': row.numlotes,
            'costestprot1': row.costestprot1,
            'costestprot2': row.costestprot2,
            'coddesig': row.coddesig,
            'designacion': row.designacion,
            'comprot': row.comprot,
            //administración
            'comusotierra': row.comusotierra,
            'compeligrnat': row.compeligrnat,
            'comexoticas': row.comexoticas,
            'usotierraf': row.usotierraf,
            'necinform': row.necinform,
            'necmanejo': row.necmanejo,
            'comam': row.comam,
            //campos opcionales
            'rbsopc1': row.rbsopc1,
            'rbsopc2': row.rbsopc2,
            'rbsopc3': row.rbsopc3,
            'rbsopc4': row.rbsopc4,
            'rbsopc5': row.rbsopc5,
            //mantenimiento del registro
            'respdatos': row.respdatos,
            'actualizar': fechaServicio.getFecha(row.actualizar)
        });
    }
}