import { FormBuilder, FormGroup } from '@angular/forms';
import { jerarquizacion_Nacional_Modelo } from '../../modelo/jerarquizacion/jerarquizacion-nacional-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
import { Jerarquizacion } from '../../modelo/jerarquizacion/jerarquizacion-modelo';
export class jerarquizacion_Nacional_FormGroup {
    jerarquizacionEditar: Jerarquizacion;
    constructor() { }
    getJerarquizacion_Nacional_FormGrup(row: jerarquizacion_Nacional_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        this.setjERARQUIZACIONjerarquizacionid(row.jERARQUIZACIONjerarquizacionid);
        return fb.group({
            'nacionalId': row.nacionalId,
            //pagina1
            'codigoe': row.codigoe,
            'nombren': row.nombren,
            'nacion': row.nacion,
            'nloctip': row.nloctip,
            'nlestim': row.nlestim,
            'nlestimcom': row.nlestimcom,
            'nabund': row.nabund,
            'nabundcom': row.nabundcom,
            'ndist': row.ndist,
            'ndistcom': row.ndistcom,
            'nleprot': row.nleprot,
            'nleprotcom': row.nleprotcom,
            'namenaz': row.namenaz,
            'namenazcom': row.namenazcom,
            //pagina2
            'notroconsi': row.notroconsi,
            'rangon': row.rangon,
            'fecharn': fechaServicio.getFecha(row.fecharn),
            'nranrzon': row.nranrzon,
            'nnecprotec': row.nnecprotec,
            'nnecinvent': row.nnecinvent,
            'nnecestudi': row.nnecestudi,
            'nnecmaejo': row.nnecmaejo,
            'resrn': row.resrn,
            'edautor': row.edautor,
            'edicion': fechaServicio.getFecha(row.edicion),
            'actualizar': fechaServicio.getFecha(row.actualizar),
            'jERARQUIZACIONjerarquizacionid': Jerarquizacion
        });
    }
    getjERARQUIZACIONjerarquizacionid(): Jerarquizacion {
        return this.jerarquizacionEditar;
    }
    setjERARQUIZACIONjerarquizacionid(jerarquizacion: Jerarquizacion) {
        this.jerarquizacionEditar = jerarquizacion;
    }
}