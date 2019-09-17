import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { jerarquizacion_Global_Modelo } from '../../modelo/jerarquizacion/jerarquizacion-global-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class jerarquizacion_Global_FormGroup {
    constructor() { }
    getJerarquizacion_Global_FormGrup(row: jerarquizacion_Global_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'globalId': row.globalId,
            //página1
            'codigoe': new FormControl(row.codigoe, [Validators.maxLength(10), Validators.required]),
            'nombreg': new FormControl(row.nombreg, Validators.maxLength(60)),
            'descrielem': new FormControl(row.descrielem, Validators.maxLength(60)),
            'especle': new FormControl(row.especle, Validators.maxLength(240)),
            'especranga': new FormControl(row.especranga, Validators.maxLength(120)),
            'especrangb': new FormControl(row.especrangb, Validators.maxLength(120)),
            'especrangc': new FormControl(row.especrangc, Validators.maxLength(120)),
            'especrangd': new FormControl(row.especrangd, Validators.maxLength(120)),
            'habitat': new FormControl(row.habitat, Validators.maxLength(120)),
            'permanencia': new FormControl(row.permanencia, Validators.maxLength(60)),
            'gloctip': new FormControl(row.gloctip, Validators.maxLength(50)),
            'comtax': new FormControl(row.comtax, Validators.maxLength(240)),
            'glestim': row.glestim,//(2)
            'glestimcom': new FormControl(row.glestimcom, Validators.maxLength(120)),
            'gabund': row.gabund,//(2)
            'gabundcom': new FormControl(row.gabundcom, Validators.maxLength(120)),
            'gdist': row.gdist,//(2)
            'gdistcom': new FormControl(row.gdistcom, Validators.maxLength(240)),
            //página 2
            'gleprot': row.gleprot,//(2)
            'gleprotcom': new FormControl(row.gleprotcom, Validators.maxLength(120)),
            'gamenaz': row.gamenaz,//(2)
            'gamenazcom': new FormControl(row.gamenazcom, Validators.maxLength(120)),
            'gfragil': row.gfragil,//(2)
            'gfragilcom': new FormControl(row.gfragilcom, Validators.maxLength(120)),
            'gotroconsi': new FormControl(row.gotroconsi, Validators.maxLength(120)),
            'rangog': row.rangog,
            'fecharg': fechaServicio.get_Fecha(row.fecharg),
            'granrazon': new FormControl(row.granrazon, Validators.maxLength(240)),
            'gnecprotec': new FormControl(row.gnecprotec, Validators.maxLength(120)),
            'gnecinvent': new FormControl(row.gnecinvent, Validators.maxLength(120)),
            'gnecestudi': new FormControl(row.gnecestudi, Validators.maxLength(120)),
            'gnecmanejo': new FormControl(row.gnecmanejo, Validators.maxLength(120)),
            //mantenimiento del registro
            'resrg': new FormControl(row.resrg, Validators.maxLength(10)),
            'edautor': new FormControl(row.edautor, Validators.maxLength(30)),
            'edicion': fechaServicio.get_Fecha(row.edicion),
            'actualizar': fechaServicio.get_Fecha(row.actualizar),
        });
    }
}
