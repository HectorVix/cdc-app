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
            'numident': new FormControl(row.numident, Validators.maxLength(10)),
            'nombreident': new FormControl(row.nombreident, Validators.maxLength(10)),
            'titulo': new FormControl(row.titulo, Validators.maxLength(10)),
            'nombre': new FormControl(row.nombre, Validators.maxLength(10)),
            'apellido1': new FormControl(row.apellido1, Validators.maxLength(10)),
            'apellido2': new FormControl(row.apellido2, Validators.maxLength(10)),
            'sufijo': new FormControl(row.sufijo, Validators.maxLength(10)),
            'posicion': new FormControl(row.posicion, Validators.maxLength(10)),
            'institucion': new FormControl(row.institucion, Validators.maxLength(10)),
            //localizadores
            'email': new FormControl(row.email, [Validators.maxLength(60), Validators.email]),
            'dir1': new FormControl(row.dir1, Validators.maxLength(10)),
            'dir2': new FormControl(row.dir2, Validators.maxLength(10)),
            'dir3': new FormControl(row.dir3, Validators.maxLength(10)),
            'pais': new FormControl(row.pais, Validators.maxLength(10)),
            'ciudad': new FormControl(row.ciudad, Validators.maxLength(10)),
            'subnacion': new FormControl(row.subnacion, Validators.maxLength(10)),
            'codpostal': new FormControl(row.codpostal, Validators.maxLength(10)),
            'masident': new FormControl(row.masident, Validators.maxLength(10)),
            'smsa': new FormControl(row.smsa, Validators.maxLength(10)),
            'teleftrabajo': row.teleftrabajo, //number
            'telefhogar': row.telefhogar,   //number
            //tipos de contactos
            'tipocont': new FormControl(row.tipocont, Validators.maxLength(10)),
            //actividades con el contacto
            'activcont': new FormControl(row.activcont, Validators.maxLength(10)),
            //descripción
            'resumen': new FormControl(row.resumen, Validators.maxLength(10)),
            //documentación y mantenimiento
            'coddirp': new FormControl(row.coddirp, Validators.maxLength(10)),
            'actualizar': fechaServicio.getFecha(row.actualizar)//date
        });
    }
}