import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { contacto_Modelo } from '../../modelo/contacto/contacto-modelo';
import { FechaService } from '../../servicios/fecha/fecha.service';
export class contacto_FormGroup {
    constructor() { }
    getContaco_FormGrup(row: contacto_Modelo): FormGroup {
        var fechaServicio: FechaService = new FechaService();
        var fb: FormBuilder = new FormBuilder();
        return fb.group({
            'contactoId': row.contactoId,
            //identificadores
            'numident': new FormControl(row.numident, Validators.maxLength(20)),
            'nombreident': new FormControl(row.nombreident, Validators.maxLength(60)),
            'titulo': new FormControl(row.titulo, Validators.maxLength(60)),
            'nombre': new FormControl(row.nombre, Validators.maxLength(60)),
            'apellido1': new FormControl(row.apellido1, Validators.maxLength(60)),
            'apellido2': new FormControl(row.apellido2, Validators.maxLength(60)),
            'sufijo': new FormControl(row.sufijo, Validators.maxLength(60)),
            'posicion': new FormControl(row.posicion, Validators.maxLength(60)),
            'institucion': new FormControl(row.institucion, Validators.maxLength(60)),
            //localizadores
            'email': new FormControl(row.email, Validators.email),
            'dir1': new FormControl(row.dir1, Validators.maxLength(60)),
            'dir2': new FormControl(row.dir2, Validators.maxLength(60)),
            'dir3': new FormControl(row.dir3, Validators.maxLength(60)),
            'pais': new FormControl(row.pais, Validators.maxLength(60)),
            'ciudad': new FormControl(row.ciudad, Validators.maxLength(60)),
            'subnacion': new FormControl(row.subnacion, Validators.maxLength(60)),
            'codpostal': new FormControl(row.codpostal, Validators.maxLength(5)),
            'masident': new FormControl(row.masident, Validators.maxLength(120)),
            'smsa': new FormControl(row.smsa, Validators.maxLength(60)),
            'teleftrabajo': row.teleftrabajo, //number
            'telefhogar': row.telefhogar,   //number
            //tipos de contactos
            'tipocont': new FormControl(row.tipocont, Validators.maxLength(120)),
            //actividades con el contacto
            'activcont': new FormControl(row.activcont, Validators.maxLength(120)),
            //descripción
            'resumen': new FormControl(row.resumen, Validators.maxLength(120)),
            //documentación y mantenimiento
            'coddirp': new FormControl(row.coddirp, Validators.maxLength(20)),
            'actualizar': fechaServicio.getFecha(row.actualizar)//date
        });
    }
}