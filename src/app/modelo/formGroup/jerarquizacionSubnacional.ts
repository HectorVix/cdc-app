import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { jerarquizacion_Subnacional_Modelo } from '../../modelo/jerarquizacion/jerarquizacion-subnacional-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class jerarquizacion_Subnacional_FormGroup {
    constructor() { }
    getJerarquizacion_Subnacional_FormGrup(row: jerarquizacion_Subnacional_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'subnacionalId': row.subnacionalId,
            'codigoe': new FormControl(row.codigoe, [Validators.maxLength(10), Validators.required]),
            'nacion': 'GT',
            'subnacion': row.subnacion,
            'nombres': new FormControl(row.nombres, Validators.maxLength(60)),
            'loctips': new FormControl(row.loctips, Validators.maxLength(50)),
            'lestims': row.lestims,//(2)
            'comlestims': new FormControl(row.comlestims, Validators.maxLength(120)),
            'abunds': row.abunds,//(2)
            'comabunds': new FormControl(row.comabunds, Validators.maxLength(120)),
            'dists': row.dists,//(2)
            'comdists': new FormControl(row.comdists, Validators.maxLength(240)),
            'leprots': row.leprots,//(2)
            'comleprots': new FormControl(row.comleprots, Validators.maxLength(120)),
            'amenazs': row.amenazs,//(2)
            'comamenazs': new FormControl(row.comamenazs, Validators.maxLength(120)),
            'otraconsids': new FormControl(row.otraconsids, Validators.maxLength(120)),
            'rangos': row.rangos,//(6)
            'fecharevrs': fechaServicio.getFecha(row.fecharevrs),
            'razonrs': new FormControl(row.loctips, Validators.maxLength(240)),
            'necprotecs': new FormControl(row.loctips, Validators.maxLength(120)),
            'necinvents': new FormControl(row.loctips, Validators.maxLength(120)),
            'necmanejos': new FormControl(row.loctips, Validators.maxLength(120)),
            //mantenimiento del registro
            'autored': new FormControl(row.loctips, Validators.maxLength(30)),
            'edicion': fechaServicio.getFecha(row.edicion),
            'actualizar': fechaServicio.getFecha(row.actualizar)
        });
    }    
}