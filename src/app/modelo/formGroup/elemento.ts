import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { elemento_Modelo } from '../../modelo/jerarquizacion/elemento-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class elemento_FormGroup {
    constructor() { }
    getElemento_FormGrup(row: elemento_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'elementoId': row.elementoId,
            'codigoe': new FormControl(row.codigoe, Validators.maxLength(10)),
            'clase': row.clase,
            'comunidad': row.comunidad,
            'nombrecomunn': new FormControl(row.nombrecomunn, Validators.maxLength(60)),
            'nombren': new FormControl(row.nombren, Validators.maxLength(60)),
            'comentario': new FormControl(row.comentario, Validators.maxLength(120)),
            'fecha': fechaServicio.getFecha(row.fecha)
        });
    }
}