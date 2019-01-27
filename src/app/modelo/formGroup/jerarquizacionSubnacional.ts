import { FormBuilder, FormGroup } from '@angular/forms';
import { jerarquizacion_Subnacional_Modelo } from '../../modelo/jerarquizacion/jerarquizacion-subnacional-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
import { Jerarquizacion } from '../../modelo/jerarquizacion/jerarquizacion-modelo';
export class jerarquizacion_Subnacional_FormGroup {
    jerarquizacionEditar: Jerarquizacion;
    constructor() { }
    getJerarquizacion_Subnacional_FormGrup(row: jerarquizacion_Subnacional_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        this.setjERARQUIZACIONjerarquizacionid(row.jERARQUIZACIONjerarquizacionid);
        return fb.group({
            'subnacionalId': row.subnacionalId,
            'codigoe': row.codigoe,
            'nacion': row.nacion,
            'subnacion': row.subnacion,
            'nombres': row.nombres,
            'loctips': row.loctips,
            'lestims': row.lestims,
            'comlestims': row.comlestims,
            'abunds': row.abunds,
            'comabunds': row.comabunds,
            'dists': row.dists,
            'comdists': row.comdists,
            'leprots': row.leprots,
            'comleprots': row.comleprots,
            'amenazs': row.amenazs,
            'comamenazs': row.comamenazs,
            'otraconsids': row.otraconsids,
            'rangos': row.rangos,
            'fecharevrs': fechaServicio.getFecha(row.fecharevrs),
            'razonrs': row.razonrs,
            'necprotecs': row.necprotecs,
            'necinvents': row.necinvents,
            'necmanejos': row.necmanejos,
            'autored': row.autored,
            'edicion': fechaServicio.getFecha(row.edicion),
            'actualizar': fechaServicio.getFecha(row.actualizar)
        });
    }
    getjERARQUIZACIONjerarquizacionid(): Jerarquizacion {
        return this.jerarquizacionEditar;
    }
    setjERARQUIZACIONjerarquizacionid(jerarquizacion: Jerarquizacion) {
        this.jerarquizacionEditar = jerarquizacion;
    }
}