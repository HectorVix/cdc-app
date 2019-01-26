import { FormBuilder, FormGroup } from '@angular/forms';
import { protocolo_LE_Modelo } from '../../modelo/localizacion/protocolo-le-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class protocolo_LE_FormGroup {
    constructor() { }
    getProtocolo_LE_FormGrup(row: protocolo_LE_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'protocoloId': row.protocoloId,
            'codigoe': row.codigoe,
            'rangog': row.rangog,
            'rangon': row.rangon,
            'rangos': row.rangos,
            'nombre': row.nombre,
            'nomcomun': row.nomcomun,
            'fecha': fechaServicio.getFecha(row.fecha)
        });
    }
}