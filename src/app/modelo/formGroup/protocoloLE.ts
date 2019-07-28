import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { protocolo_LE_Modelo } from '../../modelo/localizacion/protocolo-le-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class protocolo_LE_FormGroup {
    constructor() { }
    getProtocolo_LE_FormGrup(row: protocolo_LE_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'protocoloId': row.protocoloId,
            'codigoe': new FormControl(row.codigoe, [Validators.maxLength(10), Validators.required]),
            'rangog': new FormControl(row.rangog, Validators.maxLength(10)),
            'rangon': new FormControl(row.rangon, Validators.maxLength(10)),
            'rangos': new FormControl(row.rangos, Validators.maxLength(10)),
            'nombre': new FormControl(row.nombre, Validators.maxLength(60)),
            'nomcomun': new FormControl(row.nomcomun, Validators.maxLength(60)),
            'fecha': fechaServicio.getFecha(row.fecha)
        });
    }
}