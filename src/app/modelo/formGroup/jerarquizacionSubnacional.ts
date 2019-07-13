import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
            'codigoe': new FormControl(row.codigoe, Validators.maxLength(10)),
            'nacion': new FormControl(row.nacion, Validators.maxLength(60)),
            'subnacion': new FormControl(row.subnacion, Validators.maxLength(60)),
            'nombres': new FormControl(row.nombres, Validators.maxLength(60)),
            'loctips': new FormControl(row.loctips, Validators.maxLength(60)),
            'lestims': row.lestims,
            'comlestims': new FormControl(row.comlestims, Validators.maxLength(120)),
            'abunds': row.abunds,
            'comabunds': new FormControl(row.comabunds, Validators.maxLength(120)),
            'dists': row.dists,
            'comdists': new FormControl(row.comdists, Validators.maxLength(120)),
            'leprots': row.leprots,
            'comleprots': new FormControl(row.comleprots, Validators.maxLength(120)),
            'amenazs': row.amenazs,
            'comamenazs': new FormControl(row.comamenazs, Validators.maxLength(120)),
            'otraconsids': new FormControl(row.otraconsids, Validators.maxLength(120)),
            'rangos': row.rangos,
            'fecharevrs': fechaServicio.getFecha(row.fecharevrs),
            'razonrs': new FormControl(row.loctips, Validators.maxLength(120)),
            'necprotecs': new FormControl(row.loctips, Validators.maxLength(120)),
            'necinvents': new FormControl(row.loctips, Validators.maxLength(120)),
            'necmanejos': new FormControl(row.loctips, Validators.maxLength(120)),
            'autored': new FormControl(row.loctips, Validators.maxLength(60)),
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