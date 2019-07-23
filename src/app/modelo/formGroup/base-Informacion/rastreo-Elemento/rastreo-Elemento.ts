import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { rastreo_Elemento_Identificadores_Modelo } from '../../../../modelo/formGroup/base-Informacion/rastreo-Elemento/modelo';
export class rastreo_Elemento_Informacion_FormGroup {
    fb_Identificadores: FormBuilder = new FormBuilder();
    base_Informacion_Form: FormGroup;

    constructor() { }
    valores_Identificadores(identifacores: rastreo_Elemento_Identificadores_Modelo): FormGroup {
        return this.fb_Identificadores.group({
            'nacion': new FormControl({ value: identifacores.nacion, disabled: true }, Validators.required),
            'subnacion': ''

        });
    }
}