import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
            'codigoe': new FormControl(row.codigoe, Validators.maxLength(10)),
            'nombreg': new FormControl(row.nombreg, Validators.maxLength(60)),
            'descrielem': new FormControl(row.descrielem, Validators.maxLength(60)),
            'especle': new FormControl(row.especle, Validators.maxLength(120)),
            'especranga': new FormControl(row.especranga, Validators.maxLength(120)),
            'especrangb': new FormControl(row.especrangb, Validators.maxLength(120)),
            'especrangc': new FormControl(row.especrangc, Validators.maxLength(120)),
            'especrangd': new FormControl(row.especrangd, Validators.maxLength(120)),
            'habitat': new FormControl(row.habitat, Validators.maxLength(120)),
            'permanencia': new FormControl(row.permanencia, Validators.maxLength(120)),
            'gloctip': new FormControl(row.gloctip, Validators.maxLength(120)),
            'comtax': new FormControl(row.comtax, Validators.maxLength(120)),
            'glestim': row.glestim,
            'glestimcom': new FormControl(row.glestimcom, Validators.maxLength(120)),
            'gabund': row.gabund,
            'gabundcom': new FormControl(row.gabundcom, Validators.maxLength(120)),
            'gdist': row.gdist,
            'gdistcom': new FormControl(row.gdistcom, Validators.maxLength(120)),
            //página 2
            'gleprot': row.gleprot,
            'gleprotcom': new FormControl(row.gleprotcom, Validators.maxLength(120)),
            'gamenaz': row.gamenaz,
            'gamenazcom': new FormControl(row.gamenazcom, Validators.maxLength(120)),
            'gfragil': row.gfragil,
            'gfragilcom': new FormControl(row.gfragilcom, Validators.maxLength(120)),
            'gotroconsi': new FormControl(row.gotroconsi, Validators.maxLength(120)),
            'rangog': row.rangog,
            'fecharg': fechaServicio.getFecha(row.fecharg),
            'granrazon': new FormControl(row.granrazon, Validators.maxLength(120)),
            'gnecprotec': new FormControl(row.gnecprotec, Validators.maxLength(120)),
            'gnecinvent': new FormControl(row.gnecinvent, Validators.maxLength(120)),
            'gnecestudi': new FormControl(row.gnecestudi, Validators.maxLength(120)),
            'gnecmanejo': new FormControl(row.gnecmanejo, Validators.maxLength(120)),
            'resrg': new FormControl(row.resrg, Validators.maxLength(60)),
            'edautor': new FormControl(row.edautor, Validators.maxLength(60)),
            'edicion': fechaServicio.getFecha(row.edicion),
            'actualizar': fechaServicio.getFecha(row.actualizar),
            'jERARQUIZACIONjerarquizacionid': Jerarquizacion
        });
    }
}
