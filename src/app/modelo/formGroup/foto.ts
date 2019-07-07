import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { fotoBase_Modelo } from '../../modelo/foto/foto-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class fotoBase_FormGroup {
    constructor() { }
    getFotoBase_FormGrup(row: fotoBase_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'descripcion': new FormControl(row.descripcion, Validators.maxLength(60)),
            'comentario': new FormControl(row.comentario, Validators.maxLength(120)),
            'autor': new FormControl(row.autor, Validators.maxLength(60)),
            'fecha': row.fecha
        });
    }
}