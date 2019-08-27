import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
            'codigoe': new FormControl(row.codigoe, [Validators.maxLength(10), Validators.required]),
            'nombren': new FormControl(row.nombren, Validators.maxLength(60)),
            'nacion': 'GT',
            'nloctip': new FormControl(row.nloctip, Validators.maxLength(50)),
            'nlestim': row.nlestim,//(2)
            'nlestimcom': new FormControl(row.nlestimcom, Validators.maxLength(120)),
            'nabund': row.nabund,//(2)
            'nabundcom': new FormControl(row.nabundcom, Validators.maxLength(120)),
            'ndist': row.ndist,//(2)
            'ndistcom': new FormControl(row.ndistcom, Validators.maxLength(240)),
            'nleprot': row.nleprot,//(2)
            'nleprotcom': new FormControl(row.nleprotcom, Validators.maxLength(120)),
            'namenaz': row.namenaz,//(2)
            'namenazcom': new FormControl(row.namenazcom, Validators.maxLength(120)),
            //pagina2
            'notroconsi': new FormControl(row.notroconsi, Validators.maxLength(120)),
            'rangon': row.rangon,
            'fecharn': fechaServicio.getFecha(row.fecharn),
            'nranrzon': new FormControl(row.nranrzon, Validators.maxLength(240)),
            'nnecprotec': new FormControl(row.nnecprotec, Validators.maxLength(120)),
            'nnecinvent': new FormControl(row.nnecinvent, Validators.maxLength(120)),
            'nnecestudi': new FormControl(row.nnecestudi, Validators.maxLength(120)),
            'nnecmaejo': new FormControl(row.nnecmaejo, Validators.maxLength(120)),
            'resrn': new FormControl(row.resrn, Validators.maxLength(10)),
            'edautor': new FormControl(row.edautor, Validators.maxLength(30)),
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