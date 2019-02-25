import { FormBuilder, FormGroup } from '@angular/forms';
import { jerarquizacion_Global_Modelo } from '../../modelo/jerarquizacion/jerarquizacion-global-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
import { Jerarquizacion } from '../../modelo/jerarquizacion/jerarquizacion-modelo';
export class jerarquizacion_Global_FormGroup {
    jerarquizacionEditar: Jerarquizacion;
    constructor() { }
    getJerarquizacion_Global_FormGrup(row: jerarquizacion_Global_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'globalId': row.globalId,
            //página1
            'codigoe': row.codigoe,
            'nombreg': row.nombreg,
            'descrielem': row.descrielem,
            'especle': row.especle,
            'especranga': row.especranga,
            'especrangb': row.especrangb,
            'especrangc': row.especrangc,
            'especrangd': row.especrangd,
            'habitat': row.habitat,
            'permanencia': row.permanencia,
            'gloctip': row.gloctip,
            'comtax': row.comtax,
            'glestim': row.glestim,
            'glestimcom': row.glestimcom,
            'gabund': row.gabund,
            'gabundcom': row.gabundcom,
            'gdist': row.gdist,
            'gdistcom': row.gdistcom,
            //página 2
            'gleprot': row.gleprot,
            'gleprotcom': row.gleprotcom,
            'gamenaz': row.gamenaz,
            'gamenazcom': row.gamenazcom,
            'gfragil': row.gfragil,
            'gfragilcom': row.gfragilcom,
            'gotroconsi': row.gotroconsi,
            'rangog': row.rangog,
            'fecharg': fechaServicio.getFecha(row.fecharg),
            'granrazon': row.granrazon,
            'gnecprotec': row.gnecprotec,
            'gnecinvent': row.gnecinvent,
            'gnecestudi': row.gnecestudi,
            'gnecmanejo': row.gnecmanejo,
            'resrg': row.gnecmanejo,
            'edautor': row.edautor,
            'edicion': fechaServicio.getFecha(row.edicion),
            'actualizar': fechaServicio.getFecha(row.actualizar),
            'jERARQUIZACIONjerarquizacionid': Jerarquizacion
        });
    }
}
