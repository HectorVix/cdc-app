import { FormBuilder, FormGroup } from '@angular/forms';
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
            'numident': row.numident,
            'nombreident': row.nombreident,
            'titulo': row.titulo,
            'nombre': row.nombre,
            'apellido1': row.apellido1,
            'apellido2': row.apellido2,
            'sufijo': row.sufijo,
            'posicion': row.posicion,
            'institucion': row.institucion,
            //localizadores
            'email': row.email,
            'dir1': row.dir1,
            'dir2': row.dir2,
            'dir3': row.dir3,
            'pais': row.pais,
            'ciudad': row.ciudad,
            'subnacion': row.subnacion,
            'codpostal': row.codpostal,
            'masident': row.masident,
            'smsa': row.smsa,
            'teleftrabajo': row.teleftrabajo, //number
            'telefhogar': row.telefhogar,   //number
            //tipos de contactos
            'tipocont': row.tipocont,
            //actividades con el contacto
            'activcont': row.activcont,
            //descripción
            'resumen': row.resumen,
            //documentación y mantenimiento
            'coddirp': row.coddirp,
            'actualizar': fechaServicio.getFecha(row.actualizar)//date
        });
    }
}